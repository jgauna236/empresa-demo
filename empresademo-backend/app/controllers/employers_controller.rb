class EmployersController < ApplicationController
  before_action :set_employer, only: [:show, :update, :destroy]


#  include Knock::Authenticable

  # GET /employers
  def index
    @employers = Employer.all

    render json: @employers
  end

  # GET /employers/1
  def show
    render json: @employer
  end

   # GET /employers/byuserid/1
   def byuserid
     render json: Employer.find_by_user_id(params[:user_id]), :includes => [:user_attributes]
   end
  

  # POST /employers
  def create
    @employer = Employer.create(employer_params)
    @employer.user.add_role :employer

    if @employer.save
      render json: @employer, status: :created, location: @employer
    else
      render json: @employer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /employers/1
  def update
    if @employer.update(employer_params)
      render json: @employer
    else
      render json: @employer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /employers/1
  def destroy
    @employer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employer
      @employer = Employer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def employer_params
      params.require(:employer).permit( user_attributes: [:name, :lastname, :username, :password, :password_confirmation])
    end
end
