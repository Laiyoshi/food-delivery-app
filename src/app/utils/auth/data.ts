const baseUrl = process.env.BASE_URL_FOR_AUTH ? process.env.BASE_URL_FOR_AUTH : "";

export async function fetchRegisterUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  address: string,
  cardNumber: string,
): Promise<{ success?: string; error?: string }> {
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, phone, address, cardNumber }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Ошибка при регистрации");
    }

    return { success: data.message };
  } catch (error: unknown) {
    console.error("Ошибка:", error);
    return { error: (error as Error).message };
  }
}

export async function fetchLoginUser(data: { emailOrAccountName: string; password: string }) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка входа');
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Ошибка:', error);
    throw error;
  }
}

export async function fetchLogoutUser() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка выхода из аккаунта');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error);
    throw error;
  }
}