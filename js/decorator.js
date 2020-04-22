class Button {
    getDescription() {
        return 'simple description';
    }
}

class PrimaryButton {
    constructor(button) {
        this.button = button;
    }

    getDescription() {
       return this.button.getDescription() + " primary";
    }

}

const button = new Button();
console.log(button.getDescription());

const primary = new PrimaryButton(button);
console.log(primary.getDescription())