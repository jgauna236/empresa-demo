class User < ApplicationRecord
  rolify

  # Con este método encriptamos al password y generamos el método "authenticate"
  # que será usado por Knock
  has_secure_password


  has_and_belongs_to_many :roles, :join_table => :users_roles

  
  has_one :employer, -> { where(role: 'employer') }, class_name: "User"
  has_one :employee, -> { where(role: 'employee') }, class_name: "User"

  validates :username,  presence: true
  validates :password,  presence: true, length: { minimum: 8 }, allow_nil: true


  def to_token_payload
    {
        sub: id,
        username: username
    }
  end
    
  def self.from_token_request(request)
    username = request.params["auth"] && request.params["auth"]["username"]
    self.find_by(username: username)
  end
  
end
