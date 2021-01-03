export {};
declare global {
  interface IASM {
    readonly INTEGER: string;
    readonly DOUBLE: string;
    readonly LONG: string;
    readonly BOOLEAN: string;
    readonly SHORT: string;
    readonly CHARACTER: string;
    readonly BYTE: string;
    readonly OBJECT: string;
    readonly STRING: string;

    readonly MINECRAFT: string;
    readonly ENTITY: string;
    readonly ENTITY_FX: string;
    readonly ENTITY_ITEM: string;
    readonly ENTITY_PLAYER: string;
    readonly FILE: string;
    readonly FRAME_BUFFER: string;
    readonly ICHATCOMPONENT: string;
    readonly INVENTORY_PLAYER: string;
    readonly ITEM_STACK: string;
    readonly PACKET: string;
    readonly BLOCK_POS: string;
    readonly ENUM_FACING: string;
    readonly CANCELLABLE_EVENT: string;
    readonly TRIGGER_TYPE: string;

    readonly currentModule: string;

    JumpCondition: typeof JumpCondition;

    AccessType: typeof AccessType;

    ARRAY(o: string): string;

    L(o: string): string;

    At: AtHelper;

    desc(returnType: string, ...args: string[]): string;

    injectBuilder(
      className: string,
      methodName: string,
      descriptor: string,
      at: InjectionPoint
    ): InjectBuilder;
  }
}

declare interface AtHelper {
  (
    injectionPoint: InjectionPoint,
    before?: boolean,
    shift?: number
  ): InjectionPoint;

  HEAD: InjectionPoint["HEAD"];
  RETURN: InjectionPoint["RETURN"];
  INVOKE: InjectionPoint["INVOKE"];
  TAIL: InjectionPoint["TAIL"];
  CUSTOM: InjectionPoint["CUSTOM"];
}

declare enum JumpCondition {
  TRUE,
  FALSE,
  EQUAL,
  NOT_EQUAL,
  LESS_THAN,
  GREATER_OR_EQUAL,
  GREATER_THAN,
  LESS_OR_EQUAL,
  NULL,
  NON_NULL,
  GOTO,
  REFS_EQUAL,
  REFS_NOT_EQUAL
}

declare enum AccessType {
  PRIVATE,
  PUBLIC,
  PROTECTED,
  STATIC,
  FINAL
}

declare class InjectionPoint {
  HEAD: InjectionPoint;

  /**
   * Injects to where a return operation is made.
   *
   * Normally, this injects into every return opcode that fits this description, however,
   * optionally one can specify the exact opcode to inject to by specifying [ordinal].
   * This value (0 indexed) is the index of the operation you want.
   */
  RETURN(ordinal?: number): InjectionPoint;

  /**
   * Injects to where an invoke operation is made.
   *
   * Normally, this injects into every invoke opcode that fits this description, however,
   * optionally one can specify the exact opcode to inject to by specifying [ordinal].
   * This value (0 indexed) is the index of the operation you want.
   */
  INVOKE(descriptor: Descriptor, ordinal?: number): InjectionPoint;

  /**
   * Injects into the very very end of a method, before the final return.
   */
  TAIL: InjectionPoint;

  /**
   * Allows the user to find their own injection points. The method node
   * to be searched is passed in, and the finder method should return
   * a list of nodes to be injected to. The list can be of size >= 0.
   */
  CUSTOM(finder: (MethodNode: any) => any[]): InjectionPoint;
}

declare class Descriptor {
  constructor(owner: string, name: string, desc: string);

  readonly owner: string;

  readonly name: string;

  readonly desc: string;
}

declare class InjectBuilder {
  constructor(
    className: string,
    methodName: string,
    descriptor: string,
    at: InjectionPoint
  );

  methodMaps(obj: object): InjectBuilder;

  fieldMaps(obj: Object): InjectBuilder;

  instructions(insnList: ($: WrappedInsnListBuilder) => void): InjectBuilder;

  execute(): void;
}

declare class WrappedInsnListBuilder {
  /**
   * Invokes an exposed javascript function
   */
  invokeJS(functionName: string): WrappedInsnListBuilder;
  /**
   * Push a null reference onto the stack
   */
  aconst_null(): WrappedInsnListBuilder;
  /**
   * Load a reference onto the stack from a local variable #index
   */
  aload(index: number): WrappedInsnListBuilder;
  /**
   * Return a reference from a method
   */
  areturn(): WrappedInsnListBuilder;
  /**
   * Get the length of an array
   */
  arraylength(): WrappedInsnListBuilder;
  /**
   * Store a reference into a local variable #index
   */
  astore(index: number): WrappedInsnListBuilder;
  /**
   * Throws an error or exception (notice that the rest of the stack is cleared, leaving only a reference to the Throwable)
   */
  athrow(): WrappedInsnListBuilder;
  /**
   * Push a byte onto the stack as an integer value
   */
  bipush(value: number): WrappedInsnListBuilder;
  /**
   * Checks whether an objectref is of a certain type, the
   *  class reference of which is in the constant pool at
   *  index (indexbyte1 << 8 | indexbyte2)
   */
  checkcast(type: string): WrappedInsnListBuilder;
  /**
   * Convert a double to a float
   */
  d2f(): WrappedInsnListBuilder;
  /**
   * Convert a double to an int
   */
  d2i(): WrappedInsnListBuilder;
  /**
   * Convert a double to a long
   */
  d2l(): WrappedInsnListBuilder;
  /**
   * Add two doubles
   */
  dadd(): WrappedInsnListBuilder;
  /**
   * Compare two doubles, 1 on NaN
   */
  dcmpg(): WrappedInsnListBuilder;
  /**
   * Compare two doubles, -1 on NaN
   */
  dcmpl(): WrappedInsnListBuilder;
  /**
   * Push the constant 0.0 (a double) onto the stack
   */
  dconst_0(): WrappedInsnListBuilder;
  /**
   * Push the constant 1.0 (a double) onto the stack
   */
  dconst_1(): WrappedInsnListBuilder;
  /**
   * Divide two doubles
   */
  ddiv(): WrappedInsnListBuilder;
  /**
   * Load a double value from a local variable #index
   */
  dload(index: number): WrappedInsnListBuilder;
  /**
   * Multiply two doubles
   */
  dmul(): WrappedInsnListBuilder;
  /**
   * Negate a double
   */
  dneg(): WrappedInsnListBuilder;
  /**
   * Get the remainder from a division between two doubles
   */
  drem(): WrappedInsnListBuilder;
  /**
   * Return a double from a method
   */
  dreturn(): WrappedInsnListBuilder;
  /**
   * Store a double value into a local variable #index
   */
  dstore(index: number): WrappedInsnListBuilder;
  /**
   * Subtract a double from another
   */
  dsub(): WrappedInsnListBuilder;
  /**
   * Duplicate the value on top of the stack
   */
  dup(): WrappedInsnListBuilder;
  /**
   * Insert a copy of the top value into the stack two values
   * from the top. value1 and value2 must not be of the
   * type double or long.
   */
  dup_x1(): WrappedInsnListBuilder;
  /**
   * Insert a copy of the top value into the stack two (if
   * value2 is double or long it takes up the entry of
   * value3, too) or three values (if value2 is neither
   * double nor long) from the top
   */
  dup_x2(): WrappedInsnListBuilder;
  /**
   * Duplicate top two stack words (two values, if value1 is
   * not double nor long; a single value, if value1 is double
   * or long)
   */
  dup2(): WrappedInsnListBuilder;
  /**
   * Duplicate two words and insert beneath third word (see explanation above)
   */
  dup2_x1(): WrappedInsnListBuilder;
  /**
   * Duplicate two words and insert beneath fourth word
   */
  dup2_x2(): WrappedInsnListBuilder;
  /**
   * Convert a float to a double
   */
  f2d(): WrappedInsnListBuilder;
  /**
   * Convert a float to an int
   */
  f2i(): WrappedInsnListBuilder;
  /**
   * Convert a float to a long
   */
  f2l(): WrappedInsnListBuilder;
  /**
   * Add two floats
   */
  fadd(): WrappedInsnListBuilder;
  /**
   * Compare two floats, 1 on NaN
   */
  fcmpg(): WrappedInsnListBuilder;
  /**
   * Compare two floats, -1 on NaN
   */
  fcmpl(): WrappedInsnListBuilder;
  /**
   * Push 0.0f on the stack
   */
  fconst_0(): WrappedInsnListBuilder;
  /**
   * Push 1.0f on the stack
   */
  fconst_1(): WrappedInsnListBuilder;
  /**
   * Push 2.0f on the stack
   */
  fconst_2(): WrappedInsnListBuilder;
  /**
   * Divide two floats
   */
  fdiv(): WrappedInsnListBuilder;
  /**
   * Load a float value from a local variable #index
   */
  fload(index: number): WrappedInsnListBuilder;
  /**
   * Multiply two floats
   */
  fmul(): WrappedInsnListBuilder;
  /**
   * Negate a float
   */
  fneg(): WrappedInsnListBuilder;
  /**
   * Get the remainder from a division between two floats
   */
  frem(): WrappedInsnListBuilder;
  /**
   * Return a float
   */
  freturn(): WrappedInsnListBuilder;
  /**
   * Store a float value into a local variable #index
   */
  fstore(index: number): WrappedInsnListBuilder;
  /**
   * Subtract two floats
   */
  fsub(): WrappedInsnListBuilder;
  /**
   * Load an int value from a local variable #index
   */
  iload(value: number): WrappedInsnListBuilder;
  /**
   * Store int value into variable #index
   */
  istore(vlaue: number): WrappedInsnListBuilder;
  /**
   * Add two ints
   */
  iadd(): WrappedInsnListBuilder;
  /**
   * Return an integer from a method
   */
  ireturn(): WrappedInsnListBuilder;
  /**
   * Push a short onto the stack as an integer value
   */
  sipush(value: number): WrappedInsnListBuilder;
  /**
   * Int subtract
   */
  isub(): WrappedInsnListBuilder;
  /**
   * Push 0L (the number zero with type long) onto the stack
   */
  lconst_0(): WrappedInsnListBuilder;
  /**
   * Push 1L (the number one with type long) onto the stack
   */
  lconst_1(): WrappedInsnListBuilder;
  /**
   * store a long value in a local variable #index
   */
  lstore(value: number): WrappedInsnListBuilder;
  /**
   * Load a long value from a local variable #index
   */
  lload(value: number): WrappedInsnListBuilder;
  /**
   * Determines if an object objectref is of a given type,
   * identified by class reference index in constant pool
   * (indexbyte1 << 8 | indexbyte2)
   * In the case of ASMHelper it just uses a string rather than a reference.
   */
  instanceof(clazzName: string): WrappedInsnListBuilder;
  /**
   * Create new object of type identified by class reference
   * in constant pool index (indexbyte1 << 8 |
   *  indexbyte2)
   * In the case of ASMHelper it just uses a string rather than a reference.
   */
  new(className: string): WrappedInsnListBuilder;
  /**
   * Discard the top value on the stack
   */
  pop(): WrappedInsnListBuilder;
  /**
   * Discard the top two values on the stack (or one value, if it is a double or long)
   */
  pop2(): WrappedInsnListBuilder;
  /**
   * Swaps two top words on the stack (note that value1 and value2 must not be double or long)
   */
  swap(): WrappedInsnListBuilder;
  /**
   * Push a constant onto the stack
   */
  ldc(constant: any): WrappedInsnListBuilder;
  /**
   * Return void from method
   */
  methodReturn(): WrappedInsnListBuilder;

  /**
   * Creates a new label, but does not place it anywhere in the bytecode,
   * it simply gives you a reference to it.
   */
  makeLabel(): LabelNode;

  /**
   * Places a previously created label.
   */
  placeLabel(label: LabelNode): WrappedInsnListBuilder;
  /**
   * Jumps to a specificed label based on a condition
   */
  jump(condition: JumpCondition, label: LabelNode): WrappedInsnListBuilder;
  /**
   * Create a new array of references of length count and
   * component type identified by the class reference
   * index (indexbyte1 << 8 | indexbyte2) in the constant pool
   * In the case of ASMHelper it just uses a string rather than a reference.
   */
  anewarray(className: string): WrappedInsnListBuilder;
  /**
   * Load onto the stack a reference from an array
   */
  aaload(): WrappedInsnListBuilder;
  /**
   * Store a reference in an array
   */
  aastore(): WrappedInsnListBuilder;
  /**
   * Load a byte or Boolean value from an array
   */
  baload(): WrappedInsnListBuilder;
  /**
   * Store a byte or Boolean value into an array
   */
  bastore(): WrappedInsnListBuilder;
  /**
   * Load a char from an array
   */
  caload(): WrappedInsnListBuilder;
  /**
   * Store a char into an array
   */
  castore(): WrappedInsnListBuilder;
  /**
   * Load a double from an array
   */
  daload(): WrappedInsnListBuilder;
  /**
   * Store a double into an array
   */
  dastore(): WrappedInsnListBuilder;
  /**
   * Load a float from an array
   */
  faload(): WrappedInsnListBuilder;
  /**
   * Store a float in an array
   */
  fastore(): WrappedInsnListBuilder;
  /**
   * Creates a new array of size #size and class #className
   */
  array(
    size: number,
    className: string,
    code: ($: ArrayBuilder) => void
  ): WrappedInsnListBuilder;

  /**
   * Gets an instance of a Kotlin Object.
   */
  getKObjectInstance(objectClassName: string): WrappedInsnListBuilder;

  /**
   * Calls an instance method on a Kotlin Object.
   *
   * Behind the scenes, this produces bytecode that gets the Object instance, and
   * then calls the method.
   */
  invokeKObjectFunction(
    objectClassName: string,
    methodName: string,
    methodDesc: string,
    arguments?: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  /**
   * An abstraction over iconst, bipush, sipush, and ldc, picking the best one
   * available.
   */
  int(number: number): WrappedInsnListBuilder;

  /**
   * An abstraction over fconst and ldc, picking the best one
   * available.
   */
  double(number: number): WrappedInsnListBuilder;

  /**
   * An abstraction over fconst and ldc, picking the best one
   * available.
   */
  float(number: number): WrappedInsnListBuilder;

  /**
   * An abstraction over lconst and ldc, picking the best one
   * available.
   */
  long(number: number): WrappedInsnListBuilder;

  /**
   * Helper for creating an if clause.
   *
   * Jumps into the provided code if and only if the provided condition(s) is/are TRUE.
   * NOTE: This works somewhat inversely to a normal if statement. The code inside the if
   * will be SKIPPED if at least ONE of your jump conditions is true. While this may seem counterintuitive,
   * it better lines up with how JVM Bytecode actually works.
   *
   * If you have multiple conditions, they will be called in the order they are passed. Because of that,
   * you must set up the stack accordingly.
   *
   * NOTE: code completion will not be fully correct here due to limitation with rest parameters
   */
  ifClause(
    conditions: JumpCondition[],
    code: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  /**
   * A helper function to create a new instance of a class.
   *
   * This is simply a helper wrapper around the sequence of calls necessary to create a new object (new, dup, invokespecial)
   */
  createInstance(
    className: string,
    constructorDescription: string,
    parameters: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  ifElseClause(
    conditions: JumpCondition[],
    builder: ($: IfElseBuilder) => void
  ): WrappedInsnListBuilder;
  /**
   * Get a static field value of a class, where the field is
   * identified by field reference in the constant pool index
   * (indexbyte1 << 8 | indexbyte2)
   * In the case of ASMHelper it just uses a description rather than a reference
   */
  getStatic(owner: string, name: string, desc: string): WrappedInsnListBuilder;
  /**
   * Get a field value of an object objectref, where the field
   * is identified by field reference in the constant pool
   * index (indexbyte1 << 8 | indexbyte2)
   * In the case of ASMHelper it just uses a description rather than a reference
   */
  getField(owner: string, name: string, desc: string): WrappedInsnListBuilder;
  /**
   * Set static field to value in a class, where the field is
   * identified by a field reference index in constant pool
   * (indexbyte1 << 8 | indexbyte2)
   * In the case of ASMHelper it just uses a description rather than a reference
   */
  putStatic(owner: string, name: string, desc: string): WrappedInsnListBuilder;
  /**
   * Set field to value in an object objectref, where the field
   * is identified by a field reference index in constant pool
   * (indexbyte1 << 8 | indexbyte2)
   * In the case of ASMHelper it just uses a description rather than a reference
   */
  putField(owner: string, name: string, desc: string): WrappedInsnListBuilder;
  /**
   * Wrapper over field methods, however it appears the enum FieldAction and constructor for Descriptor are never exposed so this function seems useless
   */
  field(action: FieldAction, descriptor: Descriptor): WrappedInsnListBuilder;
  /**
   * Wrapper over field methods, however it appears the enum FieldAction is never exposed so this function seems useless
   */
  field(
    action: FieldAction,
    owner: string,
    name: string,
    desc: string
  ): WrappedInsnListBuilder;

  getLocalField(descriptor: Descriptor): WrappedInsnListBuilder;

  updateLocalField(
    descriptor: Descriptor,
    updater: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  setLocalField(
    descriptor: Descriptor,
    newValue: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  getLocalField(
    owner: string,
    name: string,
    desc: string
  ): WrappedInsnListBuilder;

  updateLocalField(
    owner: string,
    name: string,
    desc: string,
    updater: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  setLocalField(
    owner: string,
    name: string,
    desc: string,
    newValue: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;
  /**
   * Invoke a static method and puts the result on the stack (might be void); the method is identified by method reference index in constant pool (indexbyte1 << 8 | indexbyte2) In the case of ASMHelper the method is identified by the descriptor
   */
  invokeStatic(
    owner: string,
    name: string,
    desc: string,
    arguments?: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;
  /**
   * Invoke virtual method on object objectref and puts the result on the stack (might be void); the method is identified by method reference index in constant pool (indexbyte1 << 8 | indexbyte2) In the case of ASMHelper the method is identified by the descriptor
   */
  invokeVirtual(
    owner: string,
    name: string,
    desc: string,
    arguments?: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;
  /**
   * Invoke instance method on object objectref and puts the result on the stack (might be void); the method is identified by method reference index in constant pool (indexbyte1 << 8 | indexbyte2) In the case of ASMHelper the method is identified by the descriptor
   */
  invokeSpecial(
    owner: string,
    name: string,
    desc: string,
    arguments: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;
  /**
   * Invokes an interface method on object objectref and puts the result on the stack (might be void); the interface method is identified by method reference index in constant pool (indexbyte1 << 8 | indexbyte2)In the case of ASMHelper the method is identified by the descriptor
   */
  invokeInterface(
    owner: string,
    name: string,
    desc: string,
    arguments?: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  /**
   * Calls a specified method.
   *
   * @param owner the name of the owning class. Packages should be separated using slashes.
   * @param name the name of the method to call.
   * @param desc the method's signature. Ex. (F)Lnet/minecraft/util/Vec3;
   */
  invoke(
    type: InvokeType,
    owner: string,
    name: string,
    desc: string,
    arguments?: ($: WrappedInsnListBuilder) => void
  ): WrappedInsnListBuilder;

  indyHandle(type: number, owner: string, name: string, desc: string): Handle;
  /**
   * Invokes a dynamic method and puts the result on the stack (might be void); the method is identified by method reference index in constant pool (indexbyte1 << 8 | indexbyte2) In the case of ASMHelper the method is identified by the descriptor
   */
  invokeDynamic(
    name: string,
    desc: string,
    handle: Handle,
    ...bootstrapArgs: any[]
  ): WrappedInsnListBuilder;
  /**
   * store a reference value into the first available local variable
   */
  astore(): Local;
  /**
   * store a float value into the first available local variable
   */
  fstore(): Local;
  /**
   * store a integer value into the first available local variable
   */
  istore(): Local;
  /**
   * store a double value into the first available local variable
   */
  dstore(): Local;
  /**
   * store a long value into the first available local variable
   */
  lstore(): Local;
  /**
   * load a local onto the stack
   */
  load(local: Local): WrappedInsnListBuilder;
}

declare class LabelNode {}

declare class ArrayBuilder {
  aadd(code: ($: WrappedInsnListBuilder) => void): ArrayBuilder;
  badd(code: ($: WrappedInsnListBuilder) => void): ArrayBuilder;
  cadd(code: ($: WrappedInsnListBuilder) => void): ArrayBuilder;
  dadd(code: ($: WrappedInsnListBuilder) => void): ArrayBuilder;
  fadd(code: ($: WrappedInsnListBuilder) => void): ArrayBuilder;
}

declare class IfElseBuilder {
  ifCode(builder: ($: WrappedInsnListBuilder) => void): IfElseBuilder;

  elseCode(builder: ($: WrappedInsnListBuilder) => void): IfElseBuilder;
}

declare enum FieldAction {
  GET_STATIC,
  PUT_STATIC,
  GET_FIELD,
  PUT_FIELD
}

declare enum InvokeType {
  VIRTUAL,
  SPECIAL,
  STATIC,
  INTERFACE
}
/**
 * A reference to a field or a method.
 *
 * @author Remi Forax
 * @author Eric Bruneton
 */
declare class Handle {
  /**
   * The kind of field or method designated by this Handle. Should be
   * {@link Opcodes#H_GETFIELD}, {@link Opcodes#H_GETSTATIC},
   * {@link Opcodes#H_PUTFIELD}, {@link Opcodes#H_PUTSTATIC},
   * {@link Opcodes#H_INVOKEVIRTUAL}, {@link Opcodes#H_INVOKESTATIC},
   * {@link Opcodes#H_INVOKESPECIAL}, {@link Opcodes#H_NEWINVOKESPECIAL} or
   * {@link Opcodes#H_INVOKEINTERFACE}.
   */
  readonly tag: number;

  /**
   * The internal name of the class that owns the field or method designated
   * by this handle.
   */
  readonly owner: string;

  /**
   * The name of the field or method designated by this handle.
   */
  readonly name: string;

  /**
   * The descriptor of the field or method designated by this handle.
   */
  readonly desc: string;

  /**
   * Constructs a new field or method handle.
   *
   * @param tag
   *            the kind of field or method designated by this Handle. Must be
   *            {@link Opcodes#H_GETFIELD}, {@link Opcodes#H_GETSTATIC},
   *            {@link Opcodes#H_PUTFIELD}, {@link Opcodes#H_PUTSTATIC},
   *            {@link Opcodes#H_INVOKEVIRTUAL},
   *            {@link Opcodes#H_INVOKESTATIC},
   *            {@link Opcodes#H_INVOKESPECIAL},
   *            {@link Opcodes#H_NEWINVOKESPECIAL} or
   *            {@link Opcodes#H_INVOKEINTERFACE}.
   * @param owner
   *            the internal name of the class that owns the field or method
   *            designated by this handle.
   * @param name
   *            the name of the field or method designated by this handle.
   * @param desc
   *            the descriptor of the field or method designated by this
   *            handle.
   */
  constructor(tag: number, owner: string, name: string, desc: string);

  /**
   * Returns the kind of field or method designated by this handle.
   *
   * @return {@link Opcodes#H_GETFIELD}, {@link Opcodes#H_GETSTATIC},
   *         {@link Opcodes#H_PUTFIELD}, {@link Opcodes#H_PUTSTATIC},
   *         {@link Opcodes#H_INVOKEVIRTUAL}, {@link Opcodes#H_INVOKESTATIC},
   *         {@link Opcodes#H_INVOKESPECIAL},
   *         {@link Opcodes#H_NEWINVOKESPECIAL} or
   *         {@link Opcodes#H_INVOKEINTERFACE}.
   */
  getTag(): number;

  /**
   * Returns the internal name of the class that owns the field or method
   * designated by this handle.
   *
   * @return the internal name of the class that owns the field or method
   *         designated by this handle.
   */
  getOwner(): string;

  /**
   * Returns the name of the field or method designated by this handle.
   *
   * @return the name of the field or method designated by this handle.
   */
  getName(): string;

  /**
   * Returns the descriptor of the field or method designated by this handle.
   *
   * @return the descriptor of the field or method designated by this handle.
   */
  getDesc(): string;

  equals(obj: object): boolean;

  hashCode(): number;

  /**
   * Returns the textual representation of this handle. The textual
   * representation is:
   *
   * <pre>
   * owner '.' name desc ' ' '(' tag ')'
   * </pre>
   *
   * . As this format is unambiguous, it can be parsed if necessary.
   */
  toString(): string;
}

declare class Local {
  constructor(index: number, type: LocalType);

  readonly index: number;

  readonly type: LocalType;
}

declare enum LocalType {
  OBJECT,
  FLOAT,
  INT,
  DOUBLE,
  LONG
}
