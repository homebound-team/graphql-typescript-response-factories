
// This is like the Commentable interface that has no __typename
type HasName = { name: string };
// These are impls of Commentable with their own __typenames
type Cat = HasName & { kind: "cat" };
type Dog = HasName & { kind: "dog" };

// This is the GraphQL mutation that wants to type union over the concrete subclasses of Animal
type Animal = Cat | Dog;
// This is the factory returning a generic HasName pet
export const pet: HasName = { name: "dog" };
// This is the compile failure where the type union doesn't like `HasName` not having a kind
export const a: Animal = pet;
