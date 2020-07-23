<template>
  <div class="container">
    <span class="header">
      <span>Inquiries</span>
      <span class="tip">
        I frequently receive a high volume of requests.
        <br />Please leave a message, and I'll get back to you as soon as
        possible.
      </span>
    </span>
    <span class="form-split">
      <input
        class="form form-right"
        placeholder="Name"
        v-model="name"
        @input="saveToLocalStorage('name', name)"
      />
      <input
        class="form form-left"
        placeholder="Email"
        v-model="email"
        @blur="validateEmail"
        @input="saveToLocalStorage('email', email)"
      />
    </span>
    <input
      class="form"
      placeholder="Subject"
      v-model="subject"
      @input="saveToLocalStorage('subject', subject)"
    />
    <textarea
      class="form form-message"
      rows="10"
      placeholder="What's up?"
      v-model="message"
      @input="saveToLocalStorage('message', message)"
    />
    <span class="button-container">
      <button class="submit form" @click="submit">Submit</button>
      <transition name="fade-fast" mode="out-in">
        <div
          v-if="emailValid === false"
          key="emailWarning"
          :class="['warning', { jiggle: showJiggle }]"
          @animationend="showJiggle = false"
        >
          Please enter a valid email.
        </div>
        <div
          v-else-if="showingWarning"
          key="notFullWarning"
          :class="['warning', { jiggle: showJiggle }]"
          @animationend="showJiggle = false"
        >
          Please complete all fields.
        </div>
      </transition>
    </span>
  </div>
</template>

<script>
import router from "../router";

const emailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export default {
  name: "Inquiries",

  data() {
    return {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      subject: localStorage.getItem("subject") || "",
      message: localStorage.getItem("message") || "",
      emailValid: null,
      showingWarning: null,
      showJiggle: false
    };
  },

  computed: {
    submittable() {
      return !!(
        this.emailValid === true &&
        this.name &&
        this.email &&
        this.subject &&
        this.message
      );
    }
  },

  watch: {
    submittable() {
      this.showingWarning = !this.submittable;
    }
  },

  methods: {
    validateEmail() {
      if (!this.email) {
        this.emailValid = null;
        return;
      }

      this.emailValid = emailRegex.test(this.email);
    },

    saveToLocalStorage(type, data) {
      localStorage.setItem(type, data);
    },

    clearLocalStorage() {
      localStorage.removeItem("name");
      localStorage.removeItem("subject");
      localStorage.removeItem("message");
      localStorage.removeItem("email");
    },

    submit() {
      this.showingWarning = !this.submittable;
      if (this.showingWarning) {
        this.showJiggle = true;
        return;
      }

      fetch(`/.netlify/functions/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message
        })
      });

      this.clearLocalStorage();
      router.push({ name: "Thank You" });
    }
  },

  created() {
    this.validateEmail();
  }
};
</script>

<style scoped>
.header {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
}

.tip {
  font-size: 0.9rem;
  margin-top: 0.35rem;
  margin-bottom: 0.35rem;
}

.container {
  display: flex;
  flex-direction: column;
  width: 500px;
}

.form {
  padding: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  font-family: "Raleway";
  font-size: 15px;
  border: 1px solid;
  border-color: rgb(210, 210, 210);
  transition: border-color 0.15s;
}

.form:focus {
  outline: 0;
  border-color: rgb(160, 160, 160);
}

.form-right {
  margin-right: 0.1rem;
  flex: 1;
}

.form-left {
  margin-left: 0.1rem;
  padding-right: 2.3rem;
  flex: 1;
}

.form-message {
  resize: none;
  border-color: rgb(210, 210, 210);
}

.form-split {
  display: flex;
  position: relative;
}

.validate {
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  padding-left: 0.5rem;
  background: white;
}

.check {
  color: green;
}

.cross {
  color: darkred;
}

.fade-fast-leave-to,
.fade-fast-enter {
  opacity: 0;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 120ms ease-out;
}

.submit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 6rem;
  margin-right: 0.5rem;
  border: 1px solid;
  border-color: rgb(210, 210, 210);
  font-size: 0.9rem;
  transition: border-color 0.15s;
  background-color: transparent;
}

.submit:hover {
  cursor: pointer;
  border-color: rgb(160, 160, 160);
}

.button-container {
  margin-top: 0.2rem;
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.warning {
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.jiggle {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
