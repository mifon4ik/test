import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '../../utils/bem-config';
import { SwitchStatus } from '../hoc/SwitchStatus';
import { getCharacter, selectMainPage } from './MainPageSlice';
import './MainPage.scss';

const bem = cn('main-page');

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const mainPage = useSelector(selectMainPage);
  let idTimeOut: number;

  useEffect(() => {
    dispatch(getCharacter());
  }, [dispatch]);

  return (
    <div className={bem()}>
      <input
        className={bem('field')}
        type="text"
        onChange={(event) => {
          const { value } = event.target;
          if (value.length >= 2 || value.length === 0) {
            if (idTimeOut) clearTimeout(idTimeOut);
            idTimeOut = setTimeout(() => {
              dispatch(getCharacter(value));
            }, 500) as unknown as number;
          }
        }}
      />
      <SwitchStatus
        status={mainPage.status}
        ComponentOnDone={(
          <div className={bem('table-container')}>
            {mainPage.table.map((item) => (
              <div className={bem('table-item')} key={item.id}>
                <div className={bem('image')}>
                  <img src={item.image} alt="" />
                </div>
                <div className={bem('hidden-block')}>
                  <div className={bem('info')}>{`Name: ${item.name}`}</div>
                  <div className={bem('info')}>{`Status: ${item.status}`}</div>
                  <div className={bem('info')}>{`Species: ${item.species}`}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};
