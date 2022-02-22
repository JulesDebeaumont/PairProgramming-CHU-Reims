import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExams } from '../redux/slices/exam';

export default function useExams(InstitutId) {
  const dispatch = useDispatch();
  const { exams } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(getExams());
  }, []);

  return exams;
}
