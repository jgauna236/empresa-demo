class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :lastname, :roles
end
