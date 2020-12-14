import {  GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloError } from 'apollo-server-express';
import { ArgumentValidationError } from 'type-graphql';

export const formatErrors = (error: GraphQLError): GraphQLFormattedError => {
    if (error.originalError instanceof ApolloError) {
      return error;
    }
  
    if (error.originalError instanceof ArgumentValidationError) {
      const { extensions, locations, message, path } = error;
  
    if (error && error.extensions) {
        error.extensions.code = 'GRAPHQL_VALIDATION_FAILED';
    }
  
      return {
        extensions,
        locations,
        message,
        path,
      };
    }
  
    error.message = 'Internal Server Error';
  
    return error;
}
