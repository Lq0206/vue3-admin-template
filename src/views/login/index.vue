<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-06 18:03:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-26 17:46:37
-->
<template>
  <div class="login-wrapper">
    <div class="svg-bg">
      <div class="blob-1">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#BAE6FF"
            d="M43.7,-72.6C56.3,-68.5,65.7,-56,69.9,-42.4C74.1,-28.9,72.9,-14.5,73.1,0.1C73.3,14.7,74.9,29.4,69.1,40.2C63.4,51,50.4,57.9,37.7,63.2C25,68.5,12.5,72.1,-1.6,74.8C-15.7,77.6,-31.3,79.5,-44.4,74.4C-57.5,69.3,-67.9,57.3,-76.3,43.7C-84.6,30.2,-90.8,15.1,-86.9,2.2C-83,-10.6,-69.1,-21.2,-59,-31.7C-48.9,-42.3,-42.7,-52.7,-33.5,-58.7C-24.3,-64.6,-12.1,-66.2,1.7,-69.2C15.6,-72.2,31.2,-76.6,43.7,-72.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div class="blob-2">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#BAE6FF"
            d="M38.6,-67.5C49,-60.8,55.9,-48.5,62.4,-36.3C69,-24.1,75.3,-12.1,76,0.4C76.7,12.9,71.9,25.8,64.2,36.1C56.5,46.3,46.1,54,34.9,58.2C23.7,62.3,11.9,63,-2,66.5C-15.9,70,-31.8,76.4,-44.6,73.1C-57.4,69.9,-67,57,-70,43.3C-73,29.5,-69.5,14.7,-67.8,1C-66.1,-12.8,-66.4,-25.6,-62.7,-38.3C-59,-50.9,-51.4,-63.4,-40.3,-69.6C-29.2,-75.9,-14.6,-76,-0.3,-75.6C14.1,-75.1,28.1,-74.1,38.6,-67.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div class="blob-3">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#BAE6FF"
            d="M48.4,-56.7C58.2,-49.4,58.6,-29.9,59,-12.7C59.3,4.6,59.6,19.6,54,33C48.4,46.4,37,58.2,23.5,61.9C10.1,65.6,-5.3,61.2,-17.4,54.1C-29.6,47,-38.5,37.2,-49.1,25.2C-59.7,13.3,-72,-0.8,-73.9,-17C-75.8,-33.3,-67.4,-51.7,-53.3,-58.3C-39.3,-64.9,-19.6,-59.6,-0.2,-59.4C19.3,-59.2,38.5,-64,48.4,-56.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
    <LoginComponent></LoginComponent>
    <Copyright></Copyright>
  </div>
</template>

<script type="text/ecmascript-6">
import Copyright from '@/components/Copyright'
import LoginComponent from '@/components/LoginComponent'
export default {
  name: 'Login',
  setup() { },
  components: {
    Copyright, LoginComponent
  }
}

</script>
<style lang="scss" scoped>
.svg-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  [class|="blob"] {
    // position: absolute;
  }
  .blob-1 {
    margin-left: 30%;
    max-width: 300px;
    animation: shake-re 4s infinite;
    transition: all 0.28s ease;
  }
  .blob-2 {
    position: absolute;
    width: 800px;
    left: -200px;
    bottom: -400px;
    animation: shake-re 4s infinite 0.6s;
    transition: all 0.28s ease;
  }
  .blob-3 {
    width: 500px;
    position: absolute;
    right: 0;
    top: 10%;
    animation: shake-re 4s infinite 1.8s;
    transition: all 0.28s ease;
  }
  @keyframes shake-re {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
}

@media screen and(max-width: 992px) {
  .svg-bg {
    .blob-1 {
      display: none;
    }
    .blob-2 {
      width: 500px;
      left: -100px;
      bottom: -200px;
    }
    .blob-3 {
      right: 0;
      top: 6%;
      width: 400px;
    }
  }
}
</style>
