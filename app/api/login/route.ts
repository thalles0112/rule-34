import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Faz login na API Django e obtém os tokens
    const response = await axios.post(`${process.env.BACKEND_URL}/api/token/`, {
      username,
      password,
    });

    const { access, refresh } = response.data;

    // Salvar tokens em cookies HTTP-only
    (await cookies()).set("access", access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    (await cookies()).set("refresh", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Credenciais inválidas" }, { status: 401 });
  }
}


