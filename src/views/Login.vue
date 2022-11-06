<template>
  <div class="header">Sign in to your account</div>
  <div class="login">
    <el-card class="box-card">
      <div class="form">
        <label>
          <el-input v-model="login" placeholder="Login" />
        </label>
      </div>
      <div>
        <label>
          <el-input
            v-model="password"
            type="password"
            placeholder="Password"
            show-password
          />
        </label>
      </div>
      <div class="remember">
        <el-checkbox>Remember me</el-checkbox>
        <el-link>Forgot your password?</el-link>
      </div>
      <span v-if="errorText">{{ errorText }}</span>
      <el-button class="button" :disabled="isButtonDisable" @click="tryLogin"
        >Sign in</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginPage",
  data: () => ({
    login: null,
    password: null,
    errorText: null,
  }),
  computed: {
    isButtonDisable() {
      return !this.login || !this.password;
    },
  },
  methods: {
    ...mapActions("auth", { auth: "login" }),
    async tryLogin() {
      let login = await this.auth({
        username: this.login,
        password: this.password,
      });

      if (login?.user_id) {
        this.$router.push({ name: "main" });
      } else {
        this.errorText = login.errors.join(",");
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 400px;
  margin: 0 auto;
}
.form {
  margin-bottom: 15px;
}
.remember {
  display: flex;
  justify-content: space-between;
}
.button {
  width: 100%;
}
.header {
  color: rgb(17 24 39);
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 2.25rem;
  text-align: center;

  margin-bottom: 15px;
}
</style>
