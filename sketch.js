let names = ['Adelina', 'Anna', 'Benjamin', 'Callista', 'Christian', 'Claudia', 'Daniel', 'David', 'Elena', 'Emil', 'Felix', 'Gudrun', 'Hanna', 'Ines', 'Jerome', 'Julia', 'Katharina', 'Kevin', 'Leon', 'Levi', 'Luca', 'Marie', 'Martin', 'Melanie', 'Mia', 'Nele', 'Patrick', 'Paul', 'Rene', 'Sabrina', 'Sarah', 'Tim', 'Vanessa', 'Wendy', 'Xaver', 'Yvonne', 'Zoe']
let images = {}
let image_unknown, image_unknown_highlight
let cards = []
let active_cards = []
let textName, textCounter
let counter
let nameSelected
let slider
let canvas
let checkbox
let buttonRestart

let n = 15

function preload() {
	for (let name of names) {
		let image = loadImage('images/' + name + '.png')
		images[name] = image
	}

	image_unknown = loadImage('images/unbekannt.png')
	image_unknown_highlight = loadImage('images/unbekannt_highlight.png')
}

function setup() {
	for (let name of names) {
		let image = images[name]
		let card = new Card(name, image)
		cards.push(card)
	}
	cards = cards.sort((a, b) => a.name > b.name)

	canvas = createCanvas(image_unknown.width*n, image_unknown.height)

	textName = createP('...')
	textCounter = createP('...')

	// slider = createSlider(1, cards.length, 15, 1)
	// let textSlider = createP(15)
	// slider.input(() => {
	// 	n = slider.value()
	// 	canvas.remove()
	// 	canvas = createCanvas(image_unknown.width*n, image_unknown.height)
	// 	textSlider.html(n)
	// 	setupGame()
	// })

	checkbox = createCheckbox('sortiert', true)
	checkbox.input(() => {
		setupGame()
	})

	setupGame()
}

function setupGame() {
	if (buttonRestart) {
		buttonRestart.remove()
	}

	active_cards = []
	if (checkbox.checked()) {
		let m = min(n + 3, cards.length)
		let rand = random()
		// pick cards
		if (rand < 0.2) { // 20 %
			console.log(1)
			// pick all cards
			for (let card of cards) {
				active_cards.push(card)
			}
		} else if (rand < 0.4) { // 20 %
			console.log(2)
			// pick first m cards
			for (let i = 0; i < m; i++) {
				let card = cards[i]
				active_cards.push(card)
			}
		} else if (rand < 0.6) { // 20 %
			console.log(3)
			// pick last m cards
			for (let i = cards.length-m; i < cards.length; i++) {
				let card = cards[i]
				active_cards.push(card)
			}
		} else if (rand < 0.8) { // 20 %
			console.log(4)
			// pick middle m cards
			for (let i = int((cards.length-m)/2); i < int((cards.length+m)/2); i++) {
				let card = cards[i]
				active_cards.push(card)
			}
		} else { // 20 %
			console.log(5)
			// pick first n and last n cards
			for (let i = 0; i < n; i++) {
				let card = cards[i]
				active_cards.push(card)
			}
			for (let i = cards.length-n; i < cards.length; i++) {
				let card = cards[i]
				active_cards.push(card)
			}
		}
		active_cards = active_cards.sort((a, b) => a.name > b.name)
	} else {
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i]
			active_cards.push(card)
		}
		active_cards = active_cards.sort((a, b) => 0.5 - random())
		active_cards = active_cards.sort((a, b) => 0.5 - random())
	}

	// remove cards until cards.length = n
	while (active_cards.length > n) {
		let r = int(random()*names.length)
		active_cards.splice(r, 1)
	}

	// set x and visibility
	x = 0
	for (let card of active_cards) {
		card.visible = false
		card.x = x
		x += card.image.width
	}

	// reset counter
	counter = 0

	// select random name
	let r = int(random()*n)
	nameSelected = active_cards[r].name

	textName.html('Suche ' + nameSelected + '!')
	textCounter.html('')
}

function draw() {
	for (let i = 0; i < active_cards.length; i++) {
		let card = active_cards[i]
		card.show(i)
	}
}

function mouseClicked() {
	if (mouseX > width) {
		return
	}
	for (let card of active_cards) {
		if (card.mouseOver() && card.visible == false) {
			card.visible = true
			counter += 1
			textCounter.html('Versuche: ' + counter)

			if (card.name == nameSelected) {
				textCounter.remove()
				textName.html(nameSelected + ' in ' + counter + ' Versuchen gefunden!')
				buttonRestart = createButton('erneut suchen')
				buttonRestart.mousePressed(() => {
					// location.reload(true)
					setupGame()
					buttonRestart.remove()
				})
			}
		}
	}
}

class Card {
	constructor(name, image) {
		this.name = name
		this.image = image
	}

	show(n) {
		if (this.visible) {
			image(this.image, this.x, 0)
			fill(255)
			noStroke()
			rect(this.x + 10, this.image.height - 45, this.image.width - 20, 40)
		} else {
			if (this.mouseOver()) {
				image(image_unknown_highlight, this.x, 0)
			} else {
				image(image_unknown, this.x, 0)
			}
		}
		fill(0)
		noStroke()
		textAlign(CENTER, CENTER)
		textSize(40)
		text(n, this.x + this.image.width/2, this.image.height - 20)
	}

	mouseOver() {
		return (this.x < mouseX && mouseX < this.x + this.image.width) && (0 < mouseY && mouseY < this.image.height)
	}
}