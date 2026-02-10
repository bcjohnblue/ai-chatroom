<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">Color System</div>

    <div class="text-body1 q-mb-md text-grey-7">
      Click on any color to copy its utility class name to clipboard
    </div>

    <!-- Primary Colors -->
    <div class="q-mb-xl">
      <div class="text-h6 q-mb-md">Primary Colors</div>
      <div class="row q-gutter-md">
        <ColorCard
          v-for="color in primaryColors"
          :key="color.name"
          :color="color"
        />
      </div>
    </div>

    <!-- Semantic Colors -->
    <div class="q-mb-xl">
      <div class="text-h6 q-mb-md">Semantic Colors</div>
      <div class="row q-gutter-md">
        <ColorCard
          v-for="color in semanticColors"
          :key="color.name"
          :color="color"
        />
      </div>
    </div>

    <!-- Color Palettes -->
    <div v-for="palette in colorPalettes" :key="palette.name" class="q-mb-xl">
      <div class="text-h6 q-mb-md">{{ palette.name }}</div>
      <div class="row q-gutter-md">
        <ColorCard
          v-for="color in palette.colors"
          :key="color.name"
          :color="color"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import ColorCard from 'components/ColorCard.vue'


const primaryColors = [
  { name: 'Primary', hex: '#264D4F', class: 'primary' },
  { name: 'Secondary', hex: '#115383', class: 'secondary' },
  { name: 'Accent', hex: '#FB7429', class: 'accent' },
  { name: 'Dark', hex: '#1D1D1D', class: 'dark' },
  { name: 'Dark Page', hex: '#121212', class: 'dark-page' }
]
const semanticColors = [
  { name: 'Positive', hex: '#15B471', class: 'positive' },
  { name: 'Negative', hex: '#C71A1A', class: 'negative' },
  { name: 'Info', hex: '#2694E3', class: 'info' },
  { name: 'Warning', hex: '#FADD00', class: 'warning' }
]
const colorPalettes = [
  {
    name: 'Gray',
    colors: [
      { name: 'Gray 0', hex: '#F4F5F6', class: 'grey-0' },
      { name: 'Gray 50', hex: '#EBEEEF', class: 'grey-1' },
      { name: 'Gray 100', hex: '#E3E6E8', class: 'grey-2' },
      { name: 'Gray 200', hex: '#D5DADC', class: 'grey-3' },
      { name: 'Gray 300', hex: '#C6CDD0', class: 'grey-4' },
      { name: 'Gray 400', hex: '#ABB5BA', class: 'grey-5' },
      { name: 'Gray 500', hex: '#8F9CA3', class: 'grey-6' },
      { name: 'Gray 600', hex: '#73838C', class: 'grey-7' },
      { name: 'Gray 700', hex: '#5C6970', class: 'grey-8' },
      { name: 'Gray 800', hex: '#454F54', class: 'grey-9' },
      { name: 'Gray 900', hex: '#2E3538', class: 'grey-10' }
    ]
  },
  {
    name: 'Teal',
    colors: [
      { name: 'Teal 0', hex: '#EEF6F7', class: 'teal-0' },
      { name: 'Teal 50', hex: '#CBE5E6', class: 'teal-1' },
      { name: 'Teal 100', hex: '#A9D4D6', class: 'teal-2' },
      { name: 'Teal 200', hex: '#86C2C5', class: 'teal-3' },
      { name: 'Teal 300', hex: '#64B1B5', class: 'teal-4' },
      { name: 'Teal 400', hex: '#4A979B', class: 'teal-5' },
      { name: 'Teal 500', hex: '#3A7679', class: 'teal-6' },
      { name: 'Teal 600', hex: '#2E5E60', class: 'teal-7' },
      { name: 'Teal 700', hex: '#264D4F', class: 'teal-8' },
      { name: 'Teal 800', hex: '#1E3C3E', class: 'teal-9' },
      { name: 'Teal 900', hex: '#162B2D', class: 'teal-10' }
    ]
  },
  {
    name: 'Blue',
    colors: [
      { name: 'Blue 0', hex: '#EDF6FD', class: 'blue-0' },
      { name: 'Blue 50', hex: '#D2E9F9', class: 'blue-1' },
      { name: 'Blue 100', hex: '#AED7F4', class: 'blue-2' },
      { name: 'Blue 200', hex: '#81C0EE', class: 'blue-3' },
      { name: 'Blue 300', hex: '#54AAE9', class: 'blue-4' },
      { name: 'Blue 400', hex: '#2694E3', class: 'blue-5' },
      { name: 'Blue 500', hex: '#1A7EC7', class: 'blue-6' },
      { name: 'Blue 600', hex: '#1567A2', class: 'blue-7' },
      { name: 'Blue 700', hex: '#115383', class: 'blue-8' },
      { name: 'Blue 800', hex: '#0C3C5F', class: 'blue-9' },
      { name: 'Blue 900', hex: '#092B44', class: 'blue-10' }
    ]
  },
  {
    name: 'Green',
    colors: [
      { name: 'Green 0', hex: '#EAFBF4', class: 'green-0' },
      { name: 'Green 50', hex: '#CCF5E4', class: 'green-1' },
      { name: 'Green 100', hex: '#A1EDCD', class: 'green-2' },
      { name: 'Green 200', hex: '#76E5B6', class: 'green-3' },
      { name: 'Green 300', hex: '#4DDDA0', class: 'green-4' },
      { name: 'Green 400', hex: '#1CD084', class: 'green-5' },
      { name: 'Green 500', hex: '#15B471', class: 'green-6' },
      { name: 'Green 600', hex: '#11925C', class: 'green-7' },
      { name: 'Green 700', hex: '#0D7248', class: 'green-8' },
      { name: 'Green 800', hex: '#095234', class: 'green-9' },
      { name: 'Green 900', hex: '#063723', class: 'green-10' }
    ]
  },
  {
    name: 'Yellow',
    colors: [
      { name: 'Yellow 0', hex: '#FFFEF5', class: 'yellow-0' },
      { name: 'Yellow 50', hex: '#FFFCE5', class: 'yellow-1' },
      { name: 'Yellow 100', hex: '#FFF9CC', class: 'yellow-2' },
      { name: 'Yellow 200', hex: '#FFF6B3', class: 'yellow-3' },
      { name: 'Yellow 300', hex: '#FFF18A', class: 'yellow-4' },
      { name: 'Yellow 400', hex: '#FFE624', class: 'yellow-5' },
      { name: 'Yellow 500', hex: '#FADD00', class: 'yellow-6' },
      { name: 'Yellow 600', hex: '#DEC60C', class: 'yellow-7' },
      { name: 'Yellow 700', hex: '#B8A40A', class: 'yellow-8' },
      { name: 'Yellow 800', hex: '#918108', class: 'yellow-9' },
      { name: 'Yellow 900', hex: '#6A5F06', class: 'yellow-10' }
    ]
  },
  {
    name: 'Amber',
    colors: [
      { name: 'Amber 0', hex: '#FDF7ED', class: 'amber-0' },
      { name: 'Amber 50', hex: '#FBEEDA', class: 'amber-1' },
      { name: 'Amber 100', hex: '#F9E5C7', class: 'amber-2' },
      { name: 'Amber 200', hex: '#F6D4A2', class: 'amber-3' },
      { name: 'Amber 300', hex: '#F1BF74', class: 'amber-4' },
      { name: 'Amber 400', hex: '#ECAA46', class: 'amber-5' },
      { name: 'Amber 500', hex: '#E89519', class: 'amber-6' },
      { name: 'Amber 600', hex: '#C27D14', class: 'amber-7' },
      { name: 'Amber 700', hex: '#9D6510', class: 'amber-8' },
      { name: 'Amber 800', hex: '#7D500D', class: 'amber-9' },
      { name: 'Amber 900', hex: '#583809', class: 'amber-10' }
    ]
  },
  {
    name: 'Orange',
    colors: [
      { name: 'Orange 0', hex: '#FFF2EB', class: 'orange-0' },
      { name: 'Orange 50', hex: '#FEE5D7', class: 'orange-1' },
      { name: 'Orange 100', hex: '#FED5BE', class: 'orange-2' },
      { name: 'Orange 200', hex: '#FDB48C', class: 'orange-3' },
      { name: 'Orange 300', hex: '#FC945A', class: 'orange-4' },
      { name: 'Orange 400', hex: '#FB7429', class: 'orange-5' },
      { name: 'Orange 500', hex: '#EB5704', class: 'orange-6' },
      { name: 'Orange 600', hex: '#C94A03', class: 'orange-7' },
      { name: 'Orange 700', hex: '#A13B02', class: 'orange-8' },
      { name: 'Orange 800', hex: '#792C02', class: 'orange-9' },
      { name: 'Orange 900', hex: '#501D01', class: 'orange-10' }
    ]
  },
  {
    name: 'Red',
    colors: [
      { name: 'Red 0', hex: '#FDF1F1', class: 'red-0' },
      { name: 'Red 50', hex: '#FCE4E4', class: 'red-1' },
      { name: 'Red 100', hex: '#F6B7B7', class: 'red-2' },
      { name: 'Red 200', hex: '#F08A8A', class: 'red-3' },
      { name: 'Red 300', hex: '#EA5D5D', class: 'red-4' },
      { name: 'Red 400', hex: '#E43030', class: 'red-5' },
      { name: 'Red 500', hex: '#C71A1A', class: 'red-6' },
      { name: 'Red 600', hex: '#991414', class: 'red-7' },
      { name: 'Red 700', hex: '#831111', class: 'red-8' },
      { name: 'Red 800', hex: '#6C0E0E', class: 'red-9' },
      { name: 'Red 900', hex: '#480909', class: 'red-10' }
    ]
  }
]
</script>


