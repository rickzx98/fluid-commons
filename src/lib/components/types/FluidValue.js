export default class FluidValue {
    constructor(fieldDefinitions, value) {
        this.getRaw = () => value;
        this.getPrimaryKey = () => getPrimaryKey(fieldDefinitions, value);
        this.getPrimaryField = () => getPrimaryField(fieldDefinitions);
        for (let field in value) {
            if (value.hasOwnProperty(field)) {
                this[field] = value[field];
            }
        }
    }

}
function getPrimaryKey(fieldDefinitions, value) {
    return fieldDefinitions
        .filter(definition => definition.primaryKey)
        .map(definition => value[definition.field])[0];
}

function getPrimaryField(fieldDefinitions) {
    return fieldDefinitions
        .filter(definition => definition.primaryKey)
        .map(definition => definition.field)[0];
}

