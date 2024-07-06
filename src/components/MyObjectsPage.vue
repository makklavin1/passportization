<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="object-list p-4 shadow">
      <h2>Мои объекты</h2>
      <div v-if="objects.length" class="d-flex flex-wrap justify-content-center">
        <div v-for="(obj, index) in objects" :key="index" class="object-card m-2 p-2 shadow">
          <p>ИНН: {{ obj.INN }}</p>
          <p>Цвет RAL: {{ obj.RAL_color }}</p>
          <p>Адрес доставки: {{ obj.delivery_address }}</p>
          <p>Менеджер: {{ obj.manager ? obj.manager.name : 'Unknown' }}</p>
          <p>Статус объекта:
            <select v-model="obj.status" @change="updateStatus(obj)">
              <option v-for="(label, value) in statusOptions" :key="value" :value="value">
                {{ label }}
              </option>
            </select>
          </p>
        </div>
      </div>
      <div v-else>
        <p>Нет закрепленных объектов</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      objects: [],
      statusOptions: {
        'in_progress': 'В работе',
        'cancelled': 'Отменен',
        'paid': 'Оплачен'
      }
    };
  },
  mounted() {
    this.fetchObjects();
  },
  methods: {
    fetchObjects() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:8000/api/objects/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.objects = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    updateStatus(obj) {
      const token = localStorage.getItem('token');
      axios.patch(`http://localhost:8000/api/objects/${obj.id}/`, {
        status: obj.status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log('Status updated successfully');
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>

<style scoped>
.object-list {
  max-width: 1200px;
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
</style>
