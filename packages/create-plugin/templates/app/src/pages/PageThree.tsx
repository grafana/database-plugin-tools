import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css } from '@emotion/css';

import { GrafanaTheme2 } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { useStyles2 } from '@grafana/ui';

import { testIds } from '../components/testIds';
import { ROUTES } from '../constants';
import { prefixRoute } from '../utils/utils.routing';

export function PageThree() {
  const s = useStyles2(getStyles);
  const { id } = useParams<{ id: string }>();

  return (
    <PluginPage>
      <div data-testid={testIds.pageThree.container}>
        This is page three.
        <br />
        <br />
        {/* The ID parameter is set */}
        {id && (
          <>
            <strong>ID:</strong> {id}
          </>
        )}
        {/* No ID parameter */}
        {!id && (
          <>
            <strong>No id parameter is set in the URL.</strong> <br />
            Try the following link: <br />
            <Link className={s.link} to={prefixRoute(`${ROUTES.Three}/123456789`)}>
              {prefixRoute(`${ROUTES.Three}/123456789`)}
            </Link>
          </>
        )}
      </div>
    </PluginPage>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
  link: css`
    color: ${theme.colors.text.link};
    text-decoration: underline;
  `,
});
