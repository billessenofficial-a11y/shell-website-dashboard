const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export async function uploadFile(file: File): Promise<{ fileId: string; fileName: string }> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const format = file.name.split('.').pop()?.toLowerCase() || 'png';

        const response = await fetch(`${SUPABASE_URL}/functions/v1/upload-file`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Data,
            format,
          }),
        });

        const data = await response.json();

        if (data.code === '200') {
          resolve(data.result);
        } else {
          reject(new Error(data.message || 'Upload failed'));
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function submitAvatarTask(params: {
  avatarId?: string;
  templateImageFileId?: string;
  mode: 'avatar2' | 'avatar4';
  scriptMode: 'text' | 'audio';
  ttsText?: string;
  voiceId?: string;
  audioFileId?: string;
  captionId?: string;
  customMotion?: string;
  saveCustomAiAvatar?: boolean;
}) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-avatar-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return response.json();
}

export async function queryTaskStatus(taskId: string) {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/query-task-status?taskId=${taskId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
}

export async function getAvatars(params?: {
  categories?: string;
  isCustom?: boolean;
  pageNo?: number;
  pageSize?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.categories) searchParams.set('categories', params.categories);
  if (params?.isCustom !== undefined) searchParams.set('isCustom', String(params.isCustom));
  if (params?.pageNo) searchParams.set('pageNo', String(params.pageNo));
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/get-avatars?${searchParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
}

export async function getVoices(params?: {
  pageNo?: number;
  pageSize?: number;
  language?: string;
  gender?: string;
  age?: string;
  style?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.pageNo) searchParams.set('pageNo', String(params.pageNo));
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
  if (params?.language) searchParams.set('language', params.language);
  if (params?.gender) searchParams.set('gender', params.gender);
  if (params?.age) searchParams.set('age', params.age);
  if (params?.style) searchParams.set('style', params.style);

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/get-voices?${searchParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
}
