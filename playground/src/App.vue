<template>
  <main>
    <h1>vuejs3-datepicker playground</h1>

    <section id="day">
      <h2>Day view, use-utc</h2>
      <Datepicker v-model="day" use-utc format="yyyy-MM-dd" :open-date="januaryFifteenth" />
      <output data-testid="day-value">{{ day?.toISOString() }}</output>
    </section>

    <section id="month">
      <h2>Month view, use-utc</h2>
      <Datepicker
        v-model="month"
        use-utc
        minimum-view="month"
        initial-view="month"
        format="yyyy-MM"
        :open-date="januaryFirst"
      />
      <output data-testid="month-value">{{ month?.toISOString() }}</output>
    </section>

    <section id="range">
      <h2>Disabled range, 10 to 12 January</h2>
      <Datepicker inline :open-date="januaryFifteenthLocal" :disabled-dates="disabledDates" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Datepicker from '@mandeplus/vuejs3-datepicker';

const januaryFirst = new Date(Date.UTC(2024, 0, 1));
const januaryFifteenth = new Date(Date.UTC(2024, 0, 15));
const januaryFifteenthLocal = new Date(2024, 0, 15);
const disabledDates = {
  ranges: [{ from: new Date(2024, 0, 10), to: new Date(2024, 0, 12) }],
};

const day = ref<Date>();
const month = ref<Date>();
</script>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 2rem;
}

section {
  margin-bottom: 2rem;
}

output {
  display: block;
  margin-top: 0.5rem;
  font-family: monospace;
}
</style>
