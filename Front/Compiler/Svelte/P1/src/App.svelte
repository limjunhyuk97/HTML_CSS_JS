<script>
	let name= 'max';
	let age = 30;

	function incrementAge() {
		age+=1;
	}

	function subtractAge() {
		age -=1;
	}

</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}, my age is {age}</h1>
<button on:click="{incrementAge}">Add Age</button>
<button on:click="{subtractAge}">Subtract Age</button>