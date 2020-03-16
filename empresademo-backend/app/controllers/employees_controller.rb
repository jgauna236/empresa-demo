class EmployeesController < ApplicationController
  
  #include Knock::Authenticable
  before_action :set_employee, only: [:show, :update, :destroy]

  # GET /employees
  def index
    @employees = Employee.all

    render json: @employees
  end

  # GET /employees/1
  def show
    render json: @employee, :includes => [:user_attributes]
  end

  # GET /employees/byuserid/1
  def byuserid
    render json: Employee.find_by_user_id(params[:user_id]), :includes => [:user_attributes]
  end

  def byusername
    render json: Employee.joins(:user).find_by(users:{username: params[:username]}), :includes => [:user_attributes]
  end

  # POST /employees
  def create
    @employee = Employee.create(employee_params)
    @employee.user.add_role :employee

    if @employee.save
      render json: @employee, status: :created, location: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /employees/1
  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # DELETE /employees/1
  def destroy
    @employee.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def employee_params
      params.require(:employee).permit(:age, user_attributes: [:name, :lastname, :username, :password, :password_confirmation])
    end
end
