export default class Enum {
    static enumerate() {
        return Object.values(this).map((value) => ({
            id: value,
            name: this.display(value)
        }));
    }
}
