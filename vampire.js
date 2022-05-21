class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let amount = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      amount++;
      currentVamp = currentVamp.creator;
    }
    return amount;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let currentVamp = this;
    let currentAmount = currentVamp.numberOfVampiresFromOriginal;
    let compareAmount = vampire.numberOfVampiresFromOriginal;

    if (currentAmount < compareAmount) {
      return true; 
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let currentVamp  = this;
    if (currentVamp.name === name) return currentVamp;

    for (const vamp of currentVamp.offspring) {
      if (vamp.offspring) {
        currentVamp = vamp.vampireWithName(name);
      }
      if (currentVamp !== null) {
        return currentVamp;
      }
    }
    return null;
  }
  

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;

    function traverse(vampire) {
      if(vampire.offspring.length !== 0) {
        for(const desVamp of vampire.offspring) {
          total++;
          traverse(desVamp);
        }
      }
    }
    traverse(this);
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];

    function traverse(vampire) {
      if(vampire.yearConverted > 1980) millenials.push(vampire);

      if(vampire.offspring.length !== 0) {
        for (const desVamp of vampire.offspring) {
          traverse(desVamp);
        }
      }
    }
    traverse(this);
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

