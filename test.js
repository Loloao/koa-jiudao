class A {
	constructor() {
		this.nameA = 'a'
	}
	validateA () {
		console.log("A")
	}
}

class B extends A {
	constructor() {
		super()
		this.nameB = 'b'
	}
	validateB () {
		console.log('B')
	}
}

class C extends B {
	constructor() {
		super()
		this.nameC = 'c'
	}
	validateC () {
		console.log('C')
	}
}

function findMembers (target, ...props) {
	for (let key in target) {
		if (key = 'constructor') {
			findMemebers(target[key])
		} else if (props.some(
	}
}	

const c = new C()

 
