declare module 'zod' {
  interface ZodObject<T extends ZodRawShape, Output = T, Input = Output>
    extends ZodType<Output, Input> {
    validate: (
      data: Input
    ) => { success: true; data: Output } | { success: false; error: ZodError }
  }
}
