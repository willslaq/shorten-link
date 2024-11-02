import { FastifyRequest } from "fastify";

export async function handleUserIfAuthenticated(request: FastifyRequest) {
  try {
    await request.jwtVerify();
  } catch {
    // Let pass if user is not authenticated
  }
}
