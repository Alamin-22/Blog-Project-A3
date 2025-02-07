import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Populate a given path
  populate(path: string) {
    this.modelQuery = this.modelQuery.populate(path) as Query<T[], T>;
    return this;
  }

  // Search in the given searchableFields using the query parameter "search"
  search(searchableFields: string[]) {
    const searchTerm = this.query.search as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  // We exclude keys not meant for filtering and map "filter" to the "author" field.
  filter() {
    const queryObj = { ...this.query };
    // Exclude parameters that are used for other purposes
    const excludeFields = [
      'sort',
      'limit',
      'page',
      'fields',
      'search',
      'sortBy',
      'sortOrder',
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    // If a "filter" parameter is provided, assume it maps to "author"
    if (this.query.filter) {
      queryObj.author = this.query.filter;
      delete queryObj.filter;
    }

    // Apply the filtering conditions
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // Sort using "sortBy" and "sortOrder" query parameters
  sort() {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = (this.query.sortOrder as string) || 'asc';
    const sortString = sortOrder === 'desc' ? `-${sortBy}` : sortBy;
    this.modelQuery = this.modelQuery.sort(sortString);
    return this;
  }

  // Paginate based on "limit" and "page" query parameters
  paginate() {
    const limit = Number(this.query.limit) || 10;
    const page = Number(this.query.page) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Select specific fields based on the "fields" query parameter
  fields() {
    const fields =
      ((this.query.fields as string) || '').split(',').join(' ') || '-_v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
