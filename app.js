/* Joonas Ryynänen, 0507674. */




Vue.component('ostos', {
    props: ['item'],
    template: `<li class="collection-item">
    			<i class="material-icons circle">stars</i>
    			<span class="title flow-text">{{item.name}} {{item.amount}} kpl</span>
    			</li>`
  })

let app = null;

document.addEventListener( "DOMContentLoaded", function(){
	app = new Vue({
	    el: '#app',
	    data: {
		deleteId: '',
		newItemName: '',
		newItemAmount: '',
		newItemId: 4,
		list: [
		    {
		        id: 1,
		        name: 'lihapullat',
		        amount: 1
		    },
		    {
		        id: 2,
		        name: 'roiskeläppä',
		        amount: 2
		    },
		    {
		        id: 3,
		        name: 'jätski',
		        amount: 2
		    }
		]
	    },

	    mounted() {
		if (localStorage.getItem('list')) {
		  try {
		    this.list = JSON.parse(localStorage.getItem('list'));
		  } catch(e) {
		    localStorage.removeItem('list');
		  }
		}
	      },

	    methods: {
		addItem: function() {
		    if ( this.newItemName != '' && this.newItemAmount != '' && this.validAmount() && this.validName() ) {
		        this.list.push({id: this.newItemId++, name: this.newItemName, amount: this.newItemAmount})
		        this.newItemName=''
		        this.newItemAmount=''
		        this.newItemId++
		        this.saveList()
		    }
		    else {

		        alert('Tarkista että ostoksen nimi ei sisällä erikoismerkkejä ja että se on alle 15 merkkiä. Lisäksi tarkista että määrä on oikea numero.')
		    }
		},
		deleteItem: function() {
		    if ( this.validDelete() ) {
		        this.list.splice(this.deleteId-1, 1)
		        this.saveList()
		    }
		    else {
		        alert('kirjoita numero')
		        this.deleteId=''
		    }
		},

		saveList: function() {
		    const parsed = JSON.stringify(this.list);
		    localStorage.setItem('list', parsed);
		},
		validName: function() {
		    let re = /^[0-9A-Za-z.,]{2,15}$/
		    return re.test(this.newItemName)
		},
		validAmount: function() {
		    let re = /^[0-9]*$/
		    return re.test(this.newItemAmount)
		},
		validDelete: function() {
		    if ( this.deleteId==='' ) {
		        return false
		    }
		    let re = /^[0-9]*$/
		    return re.test(this.deleteId)
		}
	    }

	})
	})



