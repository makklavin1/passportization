<template>
  <div class="container mt-5">
    <h2 class="mb-4">My Objects</h2>
    <div v-if="objects.length" class="mt-4">
      <div v-for="obj in objects" :key="obj.id" class="card mb-3">
        <div class="card-body">
          <p>INN: {{ obj.INN }}</p>
          <p>RAL Color: {{ obj.RAL_color }}</p>
          <p>Delivery Address: {{ obj.delivery_address }}</p>
          <p>Status:
            <b-form-select v-model="obj.status" @change="updateStatus(obj)">
              <b-form-select-option value="in_progress">In Progress</b-form-select-option>
              <b-form-select-option value="cancelled">Cancelled</b-form-select-option>
              <b-form-select-option value="paid">Paid</b-form-select-option>
            </b-form-select>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No objects found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      objects: []
    };
  },
  methods: {
    async fetchObjects() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/objects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.objects = response.data;
      } catch (error) {
        console.error(error);
        alert('Failed to fetch objects');
      }
    },
    async updateStatus(obj) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:8000/api/objects/${obj.id}/`, {
          status: obj.status,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Status updated successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to update status');
      }
    }
  },
  mounted() {
    this.fetchObjects();
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
