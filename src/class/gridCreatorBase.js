class GridCreator {
    
    constructor(el, name, tableauAlternatif) {
        this.DOM = { el: el }
        this.refName = name
        this.tableauAlternatif = tableauAlternatif
        this.DOM.children = []
        this.nombreCellules = 0
        this.lastRow = 0
        this.positionsArray = []
        this.correspondance = []
        this.colonnes = this.DOM.el.dataset.nombrecolonnes
        this.init()

    }

    // Range dans un tableau toutes les cellules
    // de la grille
    init() {
        Array.from(this.DOM.el.childNodes).map( node => {
            if (node.nodeType !== Node.TEXT_NODE){
                return this.DOM.children.push({node})
            }
        })
        this.nombreCellules = this.DOM.children.length        
        
        this.setIndex_start_end_deep()        
        this.creationArrayCorrespondance()
        this.setCorrespondanceArray()
        this.setEl()
    }

    setIndex_start_end_deep() {

        let arrayStart
        let arrayEnd

        if (this.tableauAlternatif){

            this.tableauAlternatif.map((element, index) => {
                arrayStart = element.start.split(',')
                arrayEnd = element.end.split(',')
                let result = prepareArray(this)
                return this.positionsArray.push(result)
            })

        }else{

            this.DOM.children.map((element, index) => {
                // Extrait les variables
                arrayStart = element.node.dataset.start.split(',')
                arrayEnd = element.node.dataset.end.split(',')
                let result = prepareArray(this)
                return this.positionsArray.push(result)
            })
        }

        function prepareArray(that) {
            // definit la case de depart
            // du tableau de correspondance
            const start = Number(arrayStart[0]) + ((Number(arrayStart[1]) - 1) * that.colonnes)

            // definit la longueur de chaques cellules
            const width = Number(arrayEnd[0]) - Number(arrayStart[0]) + 1

            // definit le nombre de ligne du tableau
            // si supérieur à 1
            const deep = Number(arrayEnd[1]) - Number(arrayStart[1])

            const references = {
                start,
                width,
                deep
            }

            // recupére l'élément le plus bas
            // pour créer toutes les cases 
            // du tableau de correspondance
            if (Number(arrayEnd[1]) > that.lastRow) {
                that.lastRow = Number(arrayEnd[1])
            }

            return references
        }

        //console.log('positionsArray', this.positionsArray)
    }

    creationArrayCorrespondance() {
        // remplie toutes les cellules à 'vide'
        const nbrElement = this.colonnes * this.lastRow
        for (let i = 1; i <= nbrElement; i++ ){
            this.correspondance[i] = 'vide'
        }
        //console.log(this.colonnes, 'x', this.lastRow, ':', nbrElement, 'la base', this.correspondance)
    }

    setCorrespondanceArray() {
        this.positionsArray.map(( element, index )=> {
            //premiere position
            this.correspondance[element.start] = `${this.refName}-${index+1}` 

            // permet de conserver les cellules d'une ligne
            const cellulesReference = []
            cellulesReference.push(element.start)

            // teste la largeur
            if(element.width > 1) {
                for (let i = 1; i < element.width; i++) {
                    this.correspondance[element.start + i] = `${this.refName}-${index+1}`
                    cellulesReference.push(element.start + i)
                }
            } 
            
            // teste la profondeur
            // recupére cellulesReference 
            // et ajoute le nombre de colonne ()
            if (element.deep > 0) {
                let decalage = 0
                for (let i = 0; i < element.deep; i++) {
                    decalage = (i+1) * this.colonnes
                    for (let j = 0; j < cellulesReference.length; j++) {
                        const nouvelleRef = cellulesReference[j] + decalage
                        this.correspondance[nouvelleRef] = `${this.refName}-${index+1}`
                    }
                }
            }            
        })

        //console.log(this.correspondance)

    }

    setEl() {

        this.DOM.el.innerHTML = ''
        // tableau des elements déjà traités
        const traitementOk = []
        let compteurCellule = 0
        this.DOM.transit = document.createElement('div')


        for (let i = 1; i < this.correspondance.length; i++) {

            const ref = this.correspondance[i]

            if (ref === 'vide') {
                this.DOM.chid = document.createElement('div')
                this.DOM.chid.className = 'grid-cellule-base'
                this.DOM.chid.dataset.position = i
                this.DOM.transit.appendChild(this.DOM.chid)
            } else {
                
                if ( traitementOk.indexOf(ref) === -1 ){
                    
                    traitementOk.push(ref)
                    const refDimensions  = this.positionsArray[compteurCellule]

                    this.DOM.chid = document.createElement('div')
                    this.DOM.chid.className = `grid-cellule-content ${this.refName}-${index+1}`
                    this.DOM.chid.innerHTML = this.DOM.children[compteurCellule].node.innerHTML
                    this.DOM.chid.style.gridColumnStart = `span ${refDimensions.width}`
                    this.DOM.chid.style.gridColumnEnd = `span ${refDimensions.width}`
                    this.DOM.chid.style.gridRowStart = `span ${refDimensions.deep + 1}`
                    this.DOM.chid.style.gridRowEnd = `span ${refDimensions.deep + 1}`
                    this.DOM.transit.appendChild(this.DOM.chid) 

                    compteurCellule++                  
                }
            }
        }

        //console.log(this.DOM.transit)
        this.DOM.el.innerHTML = this.DOM.transit.innerHTML
    }
}

export default GridCreator
