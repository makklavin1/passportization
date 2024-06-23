<template>
  <div class="container mt-5">
    <h2 class="mb-4">Main Page</h2>
    <b-card>
      <b-form @submit.prevent="addObject">
        <b-form-group label-for="inn">
          <b-form-input id="inn" v-model="inn" placeholder="INN" required></b-form-input>
        </b-form-group>
        <b-form-group label-for="ralColor">
          <b-form-input id="ralColor" v-model="ralColor" placeholder="RAL Color" required></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox v-model="wall">Wall</b-form-checkbox>
          <b-form-checkbox v-model="roof">Roof</b-form-checkbox>
        </b-form-group>
        <b-form-group label-for="deliveryAddress">
          <b-form-input id="deliveryAddress" v-model="deliveryAddress" placeholder="Delivery Address" required></b-form-input>
        </b-form-group>
        <b-form-group label-for="volume">
          <b-form-input id="volume" v-model="volume" type="number" placeholder="Volume" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Add Object</b-button>
      </b-form>
    </b-card>
    <div v-if="similarObjects.length" class="mt-4">
      <h3>Similar Objects</h3>
      <div v-for="obj in similarObjects" :key="obj.id" class="card mb-3">
        <div class="card-body">
          <p>INN: {{ obj.INN }}</p>
          <p>RAL Color: {{ obj.RAL_color }}</p>
          <p>Delivery Address: {{ obj.delivery_address }}</p>
          <p>Manager: {{ obj.manager_name }}</p>
          <p>Status: {{ obj.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inn: '',
      ralColor: '',
      wall: false,
      roof: false,
      deliveryAddress: '',
      volume: '',
      similarObjects: []
    };
  },
  methods: {
    async addObject() {
      try {
        const token = localStorage.getItem('token');
        const manager = localStorage.getItem('username');
        const response = await axios.post('http://localhost:8000/api/objects/', {
          INN: this.inn,
          RAL_color: this.ralColor,
          wall: this.wall,
          roof: this.roof,
          delivery_address: this.deliveryAddress,
          volume: this.volume,
          manager: manager,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.similar_objects && response.data.similar_objects.length) {
          this.similarObjects = response.data.similar_objects;
        } else {
          this.similarObjects = [];
          this.resetForm();
          alert('Object added successfully');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to add object');
      }
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
}
</script>

<style>
.card {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-body {
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 600px;
}
</style>
