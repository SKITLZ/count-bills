const app = new Vue({
  el: '#app',
  data: {
    goal: 12570,
    bills: [
      {
        value: 5000,
        count: 1,
      },
      {
        value: 1000,
        count: 5,
      },
      {
        value: 200,
        count: 100,
      },
      {
        value: 100,
        count: 10,
      },
      {
        value: 50,
        count: 10,
      },
      {
        value: 10,
        count: 10,
      },
    ]
  },
  computed: {
    optimalBills() {
      const { billsUsed, couldCount } = this.countBills();
      if (couldCount === 0) return 'Couldn\'t find optinal bills';
      
      let returnString = `${this.countBills().couldCount} = `;
      billsUsed.forEach((el, index) => {
        if (index === 0) returnString += `${el.count} * ${el.value}`;
        else returnString += ` + ${el.count} * ${el.value}`;
      });
      return returnString;
    },
  },
  methods: {
    countBills() {
      let goal = parseInt(this.goal);
      let couldCount = 0;
      const billsUsed = [];
      this.bills.forEach((el) => {
        // Check is this bill can be used at all
        if ((goal / el.value >= 1) && (el.count > 0)) {
          billsUsed.push({ value: el.value, count: 0 });

          // Count how many time this bill can be used
          for (let i = 0; i < el.count; i++) {
            if ((goal - el.value) < 0) break;
            couldCount += el.value;
            goal -= el.value;
            billsUsed[billsUsed.length - 1].count += 1;
          }
        }
      });
      return {
        couldCount,
        billsUsed,
      };
    },
  },
})
