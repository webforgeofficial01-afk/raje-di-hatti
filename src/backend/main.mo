import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

import Map "mo:core/Map";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";


actor {
  // Authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact form submissions
  type Submission = {
    name : Text;
    phone : ?Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compare(sub1 : Submission, sub2 : Submission) : { #less; #equal; #greater } {
      Text.compare(sub1.name, sub2.name);
    };
  };

  let submissions = List.empty<Submission>();

  public shared ({ caller }) func submitContactForm(name : Text, phone : ?Text, email : Text, message : Text) : async () {
    let submission : Submission = {
      name;
      phone;
      email;
      message;
      timestamp = Time.now();
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    submissions.toArray().sort();
  };

  // Customer Reviews
  type Review = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    timestamp : Time.Time;
  };

  type ReviewInput = {
    name : Text;
    rating : Nat;
    comment : Text;
  };

  module Review {
    public func compare(r1 : Review, r2 : Review) : { #less; #equal; #greater } {
      Nat.compare(r1.id, r2.id);
    };
  };

  var nextReviewId = 0;
  let reviews = Map.empty<Nat, Review>();
  let reviewInputs = List.empty<ReviewInput>();

  public shared ({ caller }) func submitReview(name : Text, rating : Nat, comment : Text) : async Nat {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let review = {
      id = nextReviewId;
      name;
      rating;
      comment;
      timestamp = Time.now();
    };
    reviews.add(nextReviewId, review);
    nextReviewId += 1;
    review.id;
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray().sort();
  };

  public query ({ caller }) func getReviewInputs() : async [ReviewInput] {
    let reviewInputsList = List.empty<ReviewInput>();
    for (review in reviews.values()) {
      let input : ReviewInput = {
        name = review.name;
        rating = review.rating;
        comment = review.comment;
      };
      reviewInputsList.add(input);
    };
    reviewInputsList.toArray();
  };

  public shared ({ caller }) func deleteReview(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete reviews");
    };
    if (not reviews.containsKey(id)) {
      Runtime.trap("Review not found");
    };
    reviews.remove(id);
  };

  // Order Tracking
  type Order = {
    orderId : Text;
    customerName : Text;
    phone : Text;
    address : Text;
    items : Text;
    total : Nat;
    paymentMethod : Text;
    timestamp : Int;
    status : Text;
  };

  type OrderInput = {
    customerName : Text;
    phone : Text;
    address : Text;
    items : Text;
    total : Nat;
    paymentMethod : Text;
  };

  module Order {
    public func compare(o1 : Order, o2 : Order) : { #less; #equal; #greater } {
      Text.compare(o1.orderId, o2.orderId);
    };
  };

  let orders = Map.empty<Text, Order>();

  public shared ({ caller }) func submitOrder(input : OrderInput) : async Text {
    let now = Time.now();
    let suffix = Int.abs(now) % 10000;
    let paddedSuffix = if (suffix < 10) { "000" # suffix.toText() }
      else if (suffix < 100) { "00" # suffix.toText() }
      else if (suffix < 1000) { "0" # suffix.toText() }
      else { suffix.toText() };
    let orderId = "ORD-" # paddedSuffix;
    let order : Order = {
      orderId;
      customerName = input.customerName;
      phone = input.phone;
      address = input.address;
      items = input.items;
      total = input.total;
      paymentMethod = input.paymentMethod;
      timestamp = now;
      status = "Confirmed";
    };
    orders.add(orderId, order);
    orderId;
  };

  public query ({ caller }) func getOrderById(orderId : Text) : async ?Order {
    orders.get(orderId);
  };

  // Gallery Management
  type GalleryItem = {
    id : Nat;
    image : Storage.ExternalBlob;
    title : Text;
    description : Text;
    timestamp : Time.Time;
    creator : Principal;
  };

  module GalleryItem {
    public func compare(g1 : GalleryItem, g2 : GalleryItem) : { #less; #equal; #greater } {
      Nat.compare(g1.id, g2.id);
    };
  };

  var nextGalleryId = 0;
  let gallery = Map.empty<Nat, GalleryItem>();

  public shared ({ caller }) func addGalleryItem(image : Storage.ExternalBlob, title : Text, description : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };
    let item = {
      id = nextGalleryId;
      image;
      title;
      description;
      timestamp = Time.now();
      creator = caller;
    };
    gallery.add(nextGalleryId, item);
    nextGalleryId += 1;
    item.id;
  };

  public query ({ caller }) func getGalleryItem(id : Nat) : async ?GalleryItem {
    gallery.get(id);
  };

  public query ({ caller }) func getAllGalleryItems() : async [GalleryItem] {
    gallery.values().toArray().sort();
  };

  public shared ({ caller }) func deleteGalleryItem(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    if (not gallery.containsKey(id)) {
      Runtime.trap("Gallery item not found");
    };
    gallery.remove(id);
  };
};
