import endent from "endent";
import React from "react";

export default function PagesChallenge() {
  return (
    <main>
      <div className="prose dark:prose-invert">
        <h1>Challenge Fraccional</h1>
        <p>
          Queremos atraer usuarios que en Google u otros search-engines estén buscando calculadoras y registros
          históricos de la UF (CLF).
        </p>
        <p>
          Para esto, necesitamos que nos ayudes a crear una página que muestre el valor de la UF en CLP (pesos chilenos)
          con sus valores históricos y poder hacer cálculos, simulaciones, etc. Algo que haga a las personas volver y/o
          recomendar esta página.
        </p>
        <p>
          Queda a tu criterio qué features implementar y ser el <i>artesano</i> de la experiencia completa. Valoramos la
          elegancia y la capacidad de hacer cosas de gran valor en poco tiempo y código.
        </p>
        <p>Trata de mantener una linea con el diseño de nuestro sitio web Fraccional.</p>
        <p>
          Para hacer las consultas a nuestra API puedes usar esta query GraphQL como base (tiene más campos y parámetros
          pero queda como desafío poder deducirlos de la documentación abajo):
        </p>
        <pre>
          {endent`
            # Query GraphQL:
            query FraccionalChallenge($first: Int = 20) {
              exchange_rates: exchange_ratesCollection(
                first: $first
                filter: { pair_left: { eq: CLF }, pair_right: { eq: CLP } }
                orderBy: { pair_at: DescNullsLast }
              ) {
                edges {
                  node {
                    id
                    pair_at # Datetime (ISO)
                    pair_left
                    pair_right
                    pair_numeric
                  }
                }
              }
            }
          `}
        </pre>
        <p>Puedes usar esta URL para hacer las consultas:</p>
        <pre>https://api.fraccional.app/graphql/v1</pre>
        <p>El HTTP Header que necesitarás para hacer la request es el siguiente:</p>
        <pre>
          {endent`
            "apiKey": "API_KEY"
          `}
        </pre>
        <p>
          La API_KEY la puedes conseguir por email a <a href="mailto:patricio@fraccional.cl">patricio@fraccional.cl</a>{" "}
          o Telegram a <a href="https://t.me/lopezjurip">t.me/lopezjurip</a>
        </p>
        <p>
          Si abusas de la API automáticamente quedarás bloqueado por nuestro sistema. Esto también es un motivo de
          descalificación.
        </p>
        <p>
          Tu solución debe ser un fork privado de este mismo repo e implementar la solución en este mismo archivo. Si
          bien la API_KEY es pública, no la incluyas hardcodeada en tu solución (eso ya es un red flag gigante).
        </p>
        <p>Esta página se dejó intencionalmente sin diseño para que puedas mostrar tus habilidades en ese aspecto.</p>
        <p>
          A modo de ayuda te dejo los types en TypeScript a modo de documentación. Si necesitas aclarar algo me puedes
          escribir por Telegram.
        </p>
        <pre>
          {endent`
            export type Maybe<T> = T | null;
            export type InputMaybe<T> = Maybe<T>;

            export type Query = {
              exchange_ratesCollection?: Maybe<Exchange_RatesConnection>;
            };

            export type Scalars = {
              ID: { input: string; output: string; }
              String: { input: string; output: string; }
              Boolean: { input: boolean; output: boolean; }
              Int: { input: number; output: number; }
              Float: { input: number; output: number; }
              /** A high precision floating point value represented as a string */
              BigFloat: { input: string; output: string; }
              /** An arbitrary size integer represented as a string */
              BigInt: { input: string; output: string; }
              /** An opaque string using for tracking a position in results during pagination */
              Cursor: { input: unknown; output: unknown; }
              /** A date wihout time information */
              Date: { input: string; output: string; }
              /** A date and time */
              Datetime: { input: string; output: string; }
              /** A Javascript Object Notation value serialized as a string */
              JSON: { input: unknown; output: unknown; }
              /** Any type not handled by the type system */
              Opaque: { input: unknown; output: unknown; }
              /** A time without date information */
              Time: { input: string; output: string; }
              /** A universally unique identifier */
              UUID: { input: string; output: string; }
            };

            export type Node = {
              /** Retrieves a record by ID */
              nodeId: Scalars['ID']['output'];
            };

            export enum Currencies {
              Clf = 'CLF',
              Clp = 'CLP',
              Usd = 'USD'
            }

            export type Exchange_Rates = Node & {
              id: Scalars['UUID']['output'];
              disabled: Scalars['Boolean']['output'];
              pair_at: Scalars['Date']['output'];
              pair_decimals: Scalars['Int']['output'];
              pair_left: Currencies;
              pair_right: Currencies;
              pair_numeric: Scalars['BigFloat']['output'];
              pair_source?: Maybe<Scalars['String']['output']>;
              updated_at: Scalars['Datetime']['output'];
              created_at: Scalars['Datetime']['output'];
            };

            export type Exchange_RatesConnection = {
              edges: Array<Exchange_RatesEdge>;
              pageInfo: PageInfo;
            };

            export type Exchange_RatesEdge = {
              cursor: Scalars['String']['output'];
              node: Exchange_Rates;
            };

            export type PageInfo = {
              endCursor?: Maybe<Scalars['String']['output']>;
              hasNextPage: Scalars['Boolean']['output'];
              hasPreviousPage: Scalars['Boolean']['output'];
              startCursor?: Maybe<Scalars['String']['output']>;
            };

            export type QueryExchange_RatesCollectionArgs = {
              after?: InputMaybe<Scalars['Cursor']['input']>;
              before?: InputMaybe<Scalars['Cursor']['input']>;
              filter?: InputMaybe<Exchange_RatesFilter>;
              first?: InputMaybe<Scalars['Int']['input']>;
              last?: InputMaybe<Scalars['Int']['input']>;
              orderBy?: InputMaybe<Array<Exchange_RatesOrderBy>>;
            };

            export type Exchange_RatesFilter = {
              /** Returns true only if all its inner filters are true, otherwise returns false */
              and?: InputMaybe<Array<Exchange_RatesFilter>>;
              created_at?: InputMaybe<DatetimeFilter>;
              disabled?: InputMaybe<BooleanFilter>;
              id?: InputMaybe<UuidFilter>;
              nodeId?: InputMaybe<IdFilter>;
              /** Negates a filter */
              not?: InputMaybe<Exchange_RatesFilter>;
              /** Returns true if at least one of its inner filters is true, otherwise returns false */
              or?: InputMaybe<Array<Exchange_RatesFilter>>;
              pair_at?: InputMaybe<DateFilter>;
              pair_decimals?: InputMaybe<IntFilter>;
              pair_left?: InputMaybe<CurrenciesFilter>;
              pair_numeric?: InputMaybe<BigFloatFilter>;
              pair_right?: InputMaybe<CurrenciesFilter>;
              pair_source?: InputMaybe<StringFilter>;
              updated_at?: InputMaybe<DatetimeFilter>;
            };

            export type Exchange_RatesOrderBy = {
              created_at?: InputMaybe<OrderByDirection>;
              disabled?: InputMaybe<OrderByDirection>;
              id?: InputMaybe<OrderByDirection>;
              pair_at?: InputMaybe<OrderByDirection>;
              pair_decimals?: InputMaybe<OrderByDirection>;
              pair_left?: InputMaybe<OrderByDirection>;
              pair_numeric?: InputMaybe<OrderByDirection>;
              pair_right?: InputMaybe<OrderByDirection>;
              pair_source?: InputMaybe<OrderByDirection>;
              updated_at?: InputMaybe<OrderByDirection>;
            };

            export enum OrderByDirection {
              /** Ascending order, nulls first */
              AscNullsFirst = 'AscNullsFirst',
              /** Ascending order, nulls last */
              AscNullsLast = 'AscNullsLast',
              /** Descending order, nulls first */
              DescNullsFirst = 'DescNullsFirst',
              /** Descending order, nulls last */
              DescNullsLast = 'DescNullsLast'
            }
          `}
        </pre>
        <p>Si es mucho esfuerzo y no vale la pena el esfuerzo, puedes dejar pasar el desafío.</p>
      </div>
    </main>
  );
}
