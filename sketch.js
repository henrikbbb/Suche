let names = ['Adelina', 'Anna', 'Benjamin', 'Callista', 'Christian', 'Claudia', 'Daniel', 'David', 'Elena', 'Emil', 'Felix', 'Gudrun', 'Hanna', 'Ines', 'Jerome', 'Julia', 'Katharina', 'Kevin', 'Leon', 'Levi', 'Luca', 'Marie', 'Martin', 'Melanie', 'Mia', 'Nele', 'Patrick', 'Paul', 'Rene', 'Sabrina', 'Sarah', 'Tim', 'Vanessa', 'Wendy', 'Xaver', 'Yvonne', 'Zoe']
let textName, textCounter
let counter
let slider
let sliderText
let checkboxSort, checkboxPickSelectedName
let button
let personFound = false

function setup() {
	noCanvas()
	
	let divImages = createDiv()
	divImages.id('divImages')

	textName = createP('')
	textCounter = createP('')

	slider = createSlider(1, names.length, 15, 1)
	slider.input(() => {
		sliderText.html(slider.value())
		setupGame()
	})
	slider.hide()
	
	sliderText = createSpan(15)
	sliderText.hide()

	createElement('br')

	button = createButton('suche erneut')
	button.mousePressed(() => {
		setupGame()
	})

	createElement('br')
	createElement('br')

	let details = createElement('details')
	let summary = createElement('summary', 'Einstellungen')
	summary.parent(details)

	checkboxSort = createCheckbox('Namen sortieren', false)
	checkboxSort.input(() => {
		setupGame()
	})
	checkboxSort.parent(details)

	checkboxPickSelectedName = createCheckbox('gesuchter Name ist in Liste enthalten', true)
	checkboxPickSelectedName.input(() => {
		setupGame()
	})
	checkboxPickSelectedName.parent(details)
	checkboxPickSelectedName.hide()

	setupGame()
}

function setupGame() {
	divImages.innerHTML = ''

	personFound = false

	let selectedNames = selectNames()
	if (checkboxSort.checked()) {
		selectedNames = selectedNames.sort((a, b) => a > b)
	}

	let nameSelected = selectName(selectedNames)


	counter = 0
		
	for (let name of selectedNames) {
		let divImage = createDiv()
		divImage.parent(divImages)
		divImage.class('divImage')
		let img = createImg('images/unbekannt.png')
		img.parent(divImage)
		
		

		img.mousePressed(() => {
			if (personFound) {
				return
			}

			if (img.elt.src.substr(img.elt.src.length - "unbekannt.png".length) != "unbekannt.png") {
				return
			}
			
			img.attribute('src', 'images/' + name + '.png')
			counter++
			textCounter.html(counter + ' Versuche')

			if (name == nameSelected) {
				personFound = true
			}
		})

		
	}

	textName.html('Suche ' + nameSelected + '!')
	textCounter.html('0 Versuche')
}

function selectNames() {
	let selectedNames = []
	let namesCopy = [...names]

	let r = int(random(5))
	switch(r) {
		case 0:
			for (let i = 0; i < slider.value(); i++) {
				selectedNames.push(names[i])
			}
			break;
		case 1:
			for (let i = names.length - slider.value(); i < names.length; i++) {
				selectedNames.push(names[i])
			}
			break;
		default:
			for (let i = 0; i < slider.value(); i++) {
				let r = int(random(namesCopy.length))
				let name = namesCopy.splice(r, 1)[0]
				selectedNames.push(name)
			}
			break;
	}

	selectedNames = selectedNames.sort((a, b) => 0.5 - random())
	return selectedNames
}

function selectName(selectedNames) {
	if (checkboxPickSelectedName.checked()) {
		let r = int(random(selectedNames.length))
		return selectedNames[r]
	} else {
		let r = int(random(names.length))
		return names[r]
	}
}