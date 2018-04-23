class GridCreator {
    
    constructor(el, name, tableauAlternatif) {
        this.DOM = { el: el }
        this.refName = name
        this.tableauAlternatif = tableauAlternatif
        this.DOM.children = []
        this.nombreCellules = 0
        this.positionsArray = []
        this.init()
    }

    // Range dans un tableau toutes les cellules
    // de la grille
    init() {

        this.refID = this.DOM.el.id
        this.DOM.divs = this.DOM.el.querySelectorAll(` #${this.refID} > div`)    

            this.setIndex_column_and_row()        
            this.setEl()            
  
    }

    setIndex_column_and_row() {

        let arrayStart
        let arrayEnd
        //console.log('element ===============>', this.tableauAlternatif)
        this.tableauAlternatif.map((element, index) => {
            arrayStart = element.start.split(',')
            arrayEnd = element.end.split(',')
            let result = prepareArray(this)
            return this.positionsArray.push(result)
        })

        function prepareArray(that) {

            const gridRowStart = Number(arrayStart[1])
            const gridRowEnd = Number(arrayEnd[1])
            const gridColumnStart = Number(arrayStart[0])
            const gridColumnEnd = Number(arrayEnd[0])

            const references = {
                gridRowStart,
                gridRowEnd,
                gridColumnStart,
                gridColumnEnd
            }

            return references
        }

        //console.log('positionsArray', this.positionsArray)
    }

    setEl() {
        for (let i = 0; i < this.positionsArray.length; i++) {
            this.DOM.child = this.DOM.divs[i]
            this.DOM.child.className = `grid-cellule-content ${this.refName}-${i + 1}`
            this.DOM.child.style.gridColumnStart = `${this.positionsArray[i].gridColumnStart}`
            this.DOM.child.style.gridColumnEnd = `${this.positionsArray[i].gridColumnEnd}`
            this.DOM.child.style.gridRowStart = `${this.positionsArray[i].gridRowStart}`
            this.DOM.child.style.gridRowEnd = `${this.positionsArray[i].gridRowEnd}`
        }
    }
}

export default GridCreator
