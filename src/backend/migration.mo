import Map "mo:core/Map";

module {
  // Old types (from previous version — comment/timestamp field names)
  type OldReview = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    timestamp : Int;
  };

  type OldReviewInput = {
    name : Text;
    rating : Nat;
    comment : Text;
  };

  // New Review type (review/createdAt field names)
  type NewReview = {
    id : Nat;
    name : Text;
    rating : Nat;
    review : Text;
    createdAt : Int;
  };

  // Old actor stable state shape
  type OldActor = {
    reviews : Map.Map<Nat, OldReview>;
    reviewInputs : {
      var blockIndex : Nat;
      var blocks : [var [var ?OldReviewInput]];
      var elementIndex : Nat;
    };
  };

  // New actor stable state shape (reviews migrated, reviewInputs dropped)
  type NewActor = {
    reviews : Map.Map<Nat, NewReview>;
  };

  public func run(old : OldActor) : NewActor {
    let reviews = old.reviews.map<Nat, OldReview, NewReview>(
      func(_id, r) {
        {
          id = r.id;
          name = r.name;
          rating = r.rating;
          review = r.comment;
          createdAt = r.timestamp;
        }
      }
    );
    { reviews }
  };
};
