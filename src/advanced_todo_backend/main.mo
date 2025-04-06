import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor AdvancedTodo {

    //thee Todo record like a custom datatype
    public type Todo = {
        id : Nat;
        text : Text;
        completed : Bool;
    };

    var items : [Todo] = [];

    // Counter to generate unique IDs for each to-do item
    var nextId : Nat = 0;

    public func addItem(text : Text) : async Nat {
        let newItem : Todo = {
            id = nextId;
            text = text;
            completed = false;
        };
        items := Array.append(items, [newItem]);
        nextId += 1;
        return newItem.id;
    };

    // unconcensus type - ie read only 
    public func getItems() : async [Todo] {
        return items;
    };

    // concensus type - read and write
    public func updateItem(id : Nat, newText : Text) : async Bool {
        var updated = false;
        items := Array.map<Todo, Todo>(items, func(item) {
            if (item.id == id) {
                updated := true;
                { id = item.id; text = newText; completed = item.completed };
            } else {
                item;
            }
        });
        return updated;
    };

    // Remove ato-do item using ID
    public func removeItem(id : Nat) : async Bool {
        let initialLength = items.size();
        items := Array.filter<Todo>(items, func(item) {
            item.id != id;
        });
        return items.size() < initialLength;
    };

    public func toggleComplete(id : Nat) : async Bool {
        var toggled = false;
        items := Array.map<Todo, Todo>(items, func(item) {
            if (item.id == id) {
                toggled := true;
                { id = item.id; text = item.text; completed = not item.completed };
            } else {
                item;
            }
        });
        return toggled;
    };
};
