<script setup lang="ts">
import { reactive } from "vue";

const skills = reactive([
  { name: "HTML5 & CSS3 ", pct: 90 },
  { name: "JS / TS", pct: 85 },
  { name: "VUE 3 / VUEX / PINIA", pct: 85 },
  { name: "NODE / GDSCRIPT", pct: 70 },
  { name: "AI AGENT / RAG", pct: 70 },
]);
</script>
<template>
  <div class="skills-map">
    <p>{{ $t("skills.title") }}</p>
    <ul>
      <li v-for="(s, idx) in skills" :key="idx">
        <div class="skill-head">
          <div class="label">{{ s.name }}</div>
          <div class="pct">{{ s.pct }}%</div>
        </div>

        <div class="bar">
          <div class="fill" :style="{ width: s.pct + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.skills-map {
  font-family: Quicksand;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding: 18px 20px;

  p {
    line-height: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e9e7;
    color: #383937;
    font-size: 16px;
    margin: 0 0 10px 0;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 4px 0;
      min-height: 40px;

      .skill-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .label {
        font-size: 12px;
        color: #5d6765;
        font-weight: 600;
      }

      .bar {
        width: 100%;
        height: 6px;
        background: #f2fbfa;
        border-radius: 6px;
        overflow: hidden;

        .fill {
          height: 100%;
          background: linear-gradient(90deg, #bfe2e6 0%, #6fd6cc 100%);
          transition: width 0.6s ease;
          border-radius: 6px 0 0 6px;
        }
      }

      .pct {
        font-size: 12px;
        color: #5caeb6;
        font-weight: 600;
        text-align: right;
      }
    }
  }
}
</style>
