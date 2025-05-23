'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createGuideAction } from '@root/app/class-guides/_actions/create-guide';
import { transliterate } from 'transliteration';

export function useCreateGuide() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedClass || !selectedSpec || !selectedMode) {
      toast.error('Все поля обязательны');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('classId', `${selectedClass}`);
    formData.append('specializationId', `${selectedSpec}`);
    formData.append('modeId', `${selectedMode}`);

    try {
      const result = await createGuideAction(formData);
      if (result.success && result.guide) {
        // Формируем слаг
        const expectedSlug =
          `${transliterate(result.guide.className)}-${transliterate(
            result.guide.specializationName
          )}-${result.guide.id}`
            .toLowerCase()
            .replace(/\s+/g, '-');

        toast.success('Гайд успешно создан!');
        router.push(`/class-guides/${expectedSlug}`);
      } else {
        toast.error(result.error || 'Не удалось создать гайд');
      }
    } catch (error) {
      toast.error('Произошла ошибка при создании гайда');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedClass(null);
    setSelectedSpec(null);
    setSelectedMode(null);
  };

  return {
    selectedClass,
    selectedSpec,
    selectedMode,
    isLoading,
    setSelectedClass,
    setSelectedSpec,
    setSelectedMode,
    handleSubmit,
    resetSelection,
  };
}
