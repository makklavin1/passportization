<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100 no-scroll">
    <div class="input-box p-4 shadow">
      <form @submit.prevent="handleSubmit">
        <b-form-group class="mb-3">
          <b-form-input v-model="inn" placeholder="Введите ИНН компании" />
        </b-form-group>
        <b-form-group class="mb-3">
          <b-form-input v-model="ralColor" placeholder="Введите цвет RAL (стена/стена,крыша/крыша)" />
        </b-form-group>
        <b-form-group class="mb-3">
          <b-form-checkbox v-model="wall">Стеновые панели</b-form-checkbox>
          <b-form-checkbox v-model="roof">Кровельные панели</b-form-checkbox>
        </b-form-group>
        <b-form-group class="mb-3">
          <b-form-input v-model="deliveryAddress" placeholder="Введите адрес доставки" />
        </b-form-group>
        <b-form-group class="mb-3">
          <b-form-input v-model="volume" placeholder="Введите объем (стена/крыша)" />
        </b-form-group>
        <b-button type="submit" variant="primary" class="w-100">Проверить объект</b-button>
      </form>
    </div>

    <b-modal v-model="showModal" title="Similar Objects Found" hide-footer size="xl">
      <div class="d-flex flex-wrap justify-content-center">
        <div v-for="(obj, index) in similarObjects" :key="index" class="object-card m-2 p-2 shadow">
          <p>INN: {{ obj.INN }}</p>
          <p>RAL Color: {{ obj.RAL_color }}</p>
          <p>Delivery Address: {{ obj.delivery_address }}</p>
          <p>Manager: {{ obj.manager ? obj.manager.name : 'Unknown' }}</p>
          <p>Status: {{ statusOptions[obj.status] }}</p>
        </div>
      </div>
      <b-button @click="addAnyway" variant="danger" class="mt-3 w-100">Все равно добавить (убедитесь что все поля заполнены)</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { BFormGroup, BFormInput, BFormCheckbox, BButton, BModal } from 'bootstrap-vue-next';

export default {
  data() {
    return {
      inn: '',
      ralColor: '',
      wall: false,
      roof: false,
      deliveryAddress: '',
      volume: '',
      showModal: false,
      similarObjects: [],
      statusOptions: {
        'in_progress': 'В работе',
        'cancelled': 'Отменен',
        'paid': 'Оплачен'
      }
    };
  },
  components: {
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BButton,
    BModal
  },
  methods: {
    handleSubmit() {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      axios.post('http://localhost:8000/api/objects/', {
        INN: this.inn,
        RAL_color: this.ralColor,
        wall: this.wall,
        roof: this.roof,
        delivery_address: this.deliveryAddress,
        volume: this.volume,
        manager: username
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data.similar_objects && response.data.similar_objects.length > 0) {
          this.similarObjects = response.data.similar_objects;
          this.showModal = true;
        } else {
          alert('Объект добавлен');
          this.resetForm();
        }
      })
      .catch(error => {
        console.error(error);
      });
    },
    addAnyway() {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      axios.post('http://localhost:8000/api/objects/force_add/', {
        INN: this.inn,
        RAL_color: this.ralColor,
        wall: this.wall,
        roof: this.roof,
        delivery_address: this.deliveryAddress,
        volume: this.volume,
        manager: username
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        this.showModal = false;
        this.similarObjects = [];
        alert('Object added successfully');
        this.resetForm();
      })
      .catch(error => {
        console.error(error);
      });
    },
    resetForm() {
      this.inn = '';
      this.ralColor = '';
      this.wall = false;
      this.roof = false;
      this.deliveryAddress = '';
      this.volume = '';
    }
  }
};
</script>

<style scoped>
.input-box {
  width: 66.67%; /* 2/3 ширины экрана */
  max-width: 800px;
  border-radius: 15px;
  background-color: white;
}
.object-card {
  border-radius: 15px;
  background-color: white;
  width: calc(33% - 20px);
  margin: 10px;
  box-sizing: border-box;
}
.no-scroll {
  overflow-y: hidden;
}
@media (max-width: 768px) {
  .object-card {
    width: calc(50% - 20px);
  }
}
@media (max-width: 480px) {
  .object-card {
    width: calc(100% - 20px);
  }
}
html, body {
  height: 100%;
  overflow: hidden; /* Предотвращение скроллинга */
}
</style>
