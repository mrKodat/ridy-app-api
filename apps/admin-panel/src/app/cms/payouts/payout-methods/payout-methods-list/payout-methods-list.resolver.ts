import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  PayoutMethodsGQL,
  PayoutMethodsQuery,
} from '@ridy/admin-panel/generated/graphql';
import { TableService } from '@ridy/admin-panel/src/app/@services/table-service';
import { NzMessageService } from 'ng-zorro-antd/message';

export const payoutMethodsListResolver: ResolveFn<
  ApolloQueryResult<PayoutMethodsQuery>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tableService = inject(TableService);
  const gql = inject(PayoutMethodsGQL);
  const result = gql.fetch();
  const message = inject(NzMessageService);
  result.subscribe({
    error: (error) => {
      message.error(
        'This role does not have sufficient permission to access this menu.',
      );
    },
  });
  return result;
};
