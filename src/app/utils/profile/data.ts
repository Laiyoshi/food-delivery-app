const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function fetchRemoveUser() {
  try {
    const response = await fetch(`${baseUrl}/api/profile/me`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка удаления аккаунта');
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Ошибка удаления аккаунта:', error);
    throw error;
  }
}

export async function fetchUpdateProfile(data: Partial<{
  firstName: string;
  lastName: string;
  email: string;
  accountName: string;
  phone: string;
  address: string;
  cardNumber: string;
  avatar: string;
}>) {
  try {
    const response = await fetch(`${baseUrl}/api/profile/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка обновления профиля');
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Ошибка обновления профиля:', error);
    throw error;
  }
}

export async function fetchUpdateAvatar(avatarUrl: string) {
  try {
    const response = await fetch(`${baseUrl}/api/profile/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка обновления аватара');
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Ошибка обновления аватара:', error);
    throw error;
  }
}