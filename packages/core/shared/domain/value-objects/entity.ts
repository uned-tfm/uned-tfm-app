type PrimitiveTypes = string | number | boolean | Date | undefined | null;

type ValueObjectValue<Property> = Property extends PrimitiveTypes
  ? Property
  : Property extends { value: infer ValueType }
  ? ValueObjectValue<ValueType>
  : Property extends Array<infer ArrayType>
  ? Array<ValueObjectValue<ArrayType>>
  : Property extends object
  ? { [Key in keyof Property]: ValueObjectValue<Property[Key]> }
  : never;

export type Primitives<Properties> = {
  [Key in keyof Properties]: ValueObjectValue<Properties[Key]>;
};

export abstract class Entity<Properties> {
  readonly props: Properties;

  abstract get value(): Primitives<Properties>;

  constructor(props: Properties) {
    this.props = props;
  }
}
