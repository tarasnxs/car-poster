<template>
  <div id="users">
    <vue-confirm-dialog></vue-confirm-dialog>
    <br>
    <h2>Користувачі</h2>
    <div id="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Логін</th>
            <th>Повне ім'я</th>
            <th>Телефон</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.login}}</td>
            <td>{{user.fullName}}</td>
            <td>{{user.phoneNumber}}</td>
            <td>
              <select v-model="user.role" @change="changeRole(user)">
                <option value="USER">Користувач</option>
                <option value="USER,ADMIN">Адміністратор</option>
              </select>
            </td>
            <td>
              <input
                  v-if="user.status !== 'new'"
                  type="checkbox"
                  :checked="user.status === 'active'"
                  @click="changeStatus(user)">
              <template v-if="user.status === 'new'">Не підтверджений</template>
              <template v-else-if="user.status === 'active'">Активний</template>
              <template v-else-if="user.status === 'disabled'">Неактивний</template>
            </td>
            <td>
              <button class="deleteButton" @click="deleteUser(user)">
                <i class="fa fa-remove"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="newUserContainer">
      <h3>Додати нового користувача</h3>
      <div id="newUserForm">
        <Loader v-if="loading"></Loader>
        <table v-else>
          <tr>
            <td class="labelCell">
              <label for="loginField">Логін: </label>
            </td>
            <td class="inputCell">
              <input
                  id="loginField"
                  type="text"
                  v-model="newUserData.login"
                  @blur="$v.newUserData.login.$touch()"
              >
            </td>
            <td class="errorCell">
              <span v-if="$v.newUserData.login.$error">
                <template v-if="!$v.newUserData.login.minLength">
                  Мінімум {{$v.newUserData.login.$params.minLength.min}} символів
                </template>
                <template v-else-if="!$v.newUserData.login.maxLength">
                  Максимум {{$v.newUserData.login.$params.maxLength.max}} символів
                </template>
                <template v-else-if="!$v.newUserData.login.required">
                  Поле обов'язкове
                </template>
                <template v-else>
                  Тільки латиниця і числа
                </template>
              </span>
            </td>
          </tr>
          <tr>
            <td class="labelCell">
              <label for="fullNameField">Повне ім'я: </label>
            </td>
            <td class="inputCell">
              <input
                  id="fullNameField"
                  type="text"
                  v-model="newUserData.fullName"
                  @blur="$v.newUserData.fullName.$touch()"
              ><br>
            </td>
            <td class="errorCell">
              <span v-if="$v.newUserData.fullName.$error">
                <template v-if="!$v.newUserData.fullName.minLength">
                  Мінімум {{$v.newUserData.fullName.$params.minLength.min}} символи
                </template>
                <template v-else>
                  Поле обов'язкове
                </template>
              </span>
            </td>
          </tr>
          <tr>
            <td class="labelCell">
              <label for="phoneNumberField">Телефон: </label>
            </td>
            <td class="inputCell">
              <input
                  id="phoneNumberField"
                  ref="phoneField"
                  type="text"
                  v-model="newUserData.phoneNumber"
                  @blur="$v.newUserData.phoneNumber.$touch()"
              >
            </td>
            <td class="errorCell">
              <span v-if="$v.newUserData.phoneNumber.$error">
                <template>
                  Поле обов'язкове
                </template>
              </span>
            </td>
          </tr>
          <tr>
            <td class="labelCell">
              <label for="roleField">Роль: </label>
            </td>
            <td class="inputCell">
              <select id="roleField" v-model="newUserData.role">
                <option value="USER">Користувач</option>
                <option value="USER,ADMIN">Адміністратор</option>
              </select>
            </td>
            <td class="errorCell">
              <span v-if="$v.newUserData.role.$error">
                Оберіть роль
              </span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button
                  class="addButton"
                  @click="addNewUser"
                  :disabled="$v.newUserData.$anyError">
                Додати
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div id="instruction">
        <h4>Інструкція</h4>
        <ul>
          <li>1) Додаємо нового користувача через форму вище</li>
          <li>2) Новий користувач повинен знайти в Telegram бота
            <a href="https://t.me/LubeAvtoCenterBot" style="color: #ffffff" target="_blank">
              <code>@LubeAvtoCenterBot</code>
            </a>
          </li>
          <li>3) Боту потрібно надіслати свій логін та номер телефону,
            у відповідь користувач отримає тимчасовий пароль</li>
          <li>4) Залогінитись у системі використовуючи логін та тимчасовий пароль.
            Після першого логіну встановити новий пароль</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import Inputmask from 'inputmask';
import {minLength, required} from "vuelidate/lib/validators";
import maxLength from "vuelidate/lib/validators/maxLength";
export default {
  name: "Users",
  components: {Loader},
  mounted() {
    const phoneMask = new Inputmask("(999)999-99-99");
    phoneMask.mask(this.$refs.phoneField);
  },
  data() {
    return {
      users: [
        {
          id: "1",
          login: "taras",
          fullName: "Taras",
          phoneNumber: "(063)252-11-68",
          role: "USER",
          status: "new"
        },
        {
          id: "2",
          login: "petro",
          fullName: "Петро",
          phoneNumber: "(099)375-11-23",
          role: "USER,ADMIN",
          status: "active"
        },
        {
          id: "3",
          login: "andrew",
          fullName: "Андрій",
          phoneNumber: "(066)245-21-33",
          role: "USER",
          status: "disabled"
        },
        {
          id: "4",
          login: "test",
          fullName: "Тест",
          phoneNumber: "(077)777-77-77",
          role: "USER,ADMIN",
          status: "disabled"
        }
      ],
      newUserData : {
        login: "",
        fullName: "",
        phoneNumber: "",
        role: ""
      },
      loading : false
    }
  },
  methods: {
    changeRole(user) {
      //TODO save to db
      const msg = user.login + " тепер " + (user.role === 'USER' ? "Користувач" : "Адміністратор");
      this.$toasted.success(msg,
          {
            position: 'top-center',
            duration: 6500,
            keepOnHover: true,
            theme: 'bubble'
          });
    },
    deleteUser(user) {
      this.$confirm(
          {
            message: "Ви дійсно хочете видалити користувача " + user.login + "?",
            button: {
              no: 'Відміна',
              yes: 'Так'
            },
            callback: async confirm => {
              if (confirm) {
                //TODO delete from db
                this.users = this.users.filter(u => u !== user);
              }
            }
          }
      )
      console.log(user.id);
    },
    changeStatus(user) {
      user.status = user.status === 'active' ? 'disabled' : 'active';
      //TODO save to db
    },
    addNewUser() {
      this.$v.newUserData.$touch();
      if (this.$v.newUserData.$anyError)
        return ;
      //TODO save to db
      let nextId = Math.max.apply(Math, this.users.map(function (o) { return o.id})) + 1;
      this.users.push({
        id: nextId,
        login: this.newUserData.login,
        fullName: this.newUserData.fullName,
        phoneNumber: this.newUserData.phoneNumber,
        role: this.newUserData.role,
        status: "new"
      });
      this.newUserData = {
        login: "",
        fullName: "",
        phoneNumber: "",
        role: ""
      }
      this.$v.newUserData.$reset();
    }
  },
  validations: {
    newUserData: {
      login: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(16),
        validFormat: val => /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/.test(val)
      },
      fullName: {
        required,
        minLength: minLength(3)
      },
      phoneNumber: {
        validFormat: val => /^[^_]+$/.test(val)
      },
      role: {
        required
      }
    }
  }
}
</script>

<style scoped>
#users {
  margin: 0 auto;
  padding: 10px;
  max-height: 80%;
}

#users > table {
  width: 100%;
}

#tableContainer {
  display: inline-block;
  width: 59%;
  vertical-align: top;
  font-size: 0.7em;
}

#tableContainer > table > tbody > tr > td {
  padding: 10px;
}

#newUserContainer {
  display: inline-block;
  width: 35%;
  float: right;
}

li {
  list-style: none;
  padding-bottom: 10px;
}

#instruction {
  display: inline-block;
  font-weight: 100;
  font-size: 0.7em;
  width: 400px;
  vertical-align: top;
}

#newUserForm {
  display: inline-block;
}

.labelCell {
  text-align: right;
}

.inputCell {
  padding: 5px;
}

.errorCell {
  font-style: italic;
  color: orangered;
  font-size: 0.8em;
  font-weight: 200;
}

.inputCell > input, select {
  width: 150px;
}

.addButton {
  font-size: 16px;
  font-weight: 600;
  margin: 10px;
}

.deleteButton {
  border-radius: 50%;
  color: white;
  border: none;
  width: 25px;
  height: 25px;
  background-color: red;
}


</style>
