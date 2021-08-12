import React from 'react';
import { Status } from '.';

type PropsType = {
  status: Status | string,
  ComponentOnNoStatus?: React.ReactElement,
  ComponentOnDone: React.ReactElement,
  ComponentOnLoading?: React.ReactElement,
  ComponentOnError?: React.ReactElement,
}

export const SwitchStatus: React.FC<PropsType> = ({
  status, ComponentOnNoStatus, ComponentOnDone, ComponentOnLoading, ComponentOnError,
}: PropsType) => (
  <>
    {status === Status.NO_STATUS && ComponentOnNoStatus}
    {status === Status.DONE && ComponentOnDone}
    {status === Status.LOADING && (ComponentOnLoading || <span>Загрузка</span>)}
    {status === Status.ERROR && ComponentOnError}
  </>
);
