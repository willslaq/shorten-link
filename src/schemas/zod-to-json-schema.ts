import { ZodObject, ZodRawShape, ZodString, ZodTypeAny } from "zod";

export function zodToJsonSchema(zodSchema: ZodObject<ZodRawShape>) {
  const jsonSchema: Record<string, any> = {
    type: "object",
    properties: {},
    required: [],
  };

  for (const key in zodSchema.shape) {
    if (zodSchema.shape.hasOwnProperty(key)) {
      const property = zodSchema.shape[key] as ZodTypeAny;
      let type: string;

      switch (property._def.typeName) {
        case "ZodString":
          type = "string";
          break;
        case "ZodNumber":
          type = "number";
          break;
        case "ZodBoolean":
          type = "boolean";
          break;
        case "ZodDate":
          type = "string";
          jsonSchema.properties[key].format = "date-time";
          break;
        default:
          type = "string"; // Default case
      }

      jsonSchema.properties[key] = { type };

      if (property instanceof ZodString) {
        if (property._def.checks.some((check) => check.kind === "min")) {
          jsonSchema.properties[key].minLength = property._def.checks.find(
            (check) => check.kind === "min"
          )?.value;
        }
        if (property._def.checks.some((check) => check.kind === "max")) {
          jsonSchema.properties[key].maxLength = property._def.checks.find(
            (check) => check.kind === "max"
          )?.value;
        }
      }

      if (!property.isOptional()) {
        jsonSchema.required.push(key);
      }
    }
  }

  return jsonSchema;
}
