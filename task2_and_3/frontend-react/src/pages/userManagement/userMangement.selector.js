import { createSelector } from 'reselect';
import { get } from 'lodash';

const accountSelector = createSelector(
  (state) => { return get(state, 'auth.account'); },
  (account) => { return account; }
);

export { accountSelector };
