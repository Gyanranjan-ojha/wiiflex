"""
Environment variables settings for API project.
"""
from pydantic import SecretStr, EmailStr, Field
from pydantic_settings import BaseSettings
from typing import Dict

class EnvSettings(BaseSettings):
  """
  Settings class for managing environment variables used in the DQHAdmin API application.
  """
  MYSQL_HOST: str
  MYSQL_USER: str
  MYSQL_PASSWORD: SecretStr
  MYSQL_PORT: int
  MYSQL_DB: str
  SECRET_KEY: SecretStr
  DEBUG: int = Field(..., gt=-1, lt=2, description="Debug value should be 1 or 0")
  DJANGO_ALLOWED_HOSTS: str
  CURRENT_ENVIRONMENT: str
  AUTH_TOKEN: SecretStr
  DJANGO_SUPERUSER_EMAIL: EmailStr
  DJANGO_SUPERUSER_PASSWORD: SecretStr
  FE_DOMAIN: str
  
  class Config:
    env_file = '.env'
    env_file_encoding = 'utf-8'

  def django_env(self) -> Dict[str, str]:
    """Returns Django related environment variables."""
    return {
      "DEBUG": self.DEBUG,
      "DJANGO_ALLOWED_HOSTS": self.DJANGO_ALLOWED_HOSTS,
      "SECRET_KEY": self.SECRET_KEY.get_secret_value(),
      "CURRENT_ENVIRONMENT": self.CURRENT_ENVIRONMENT,
      "AUTH_TOKEN": self.AUTH_TOKEN.get_secret_value(),
    }

  def mysql_env(self) -> Dict[str, str]:
    """Returns MySQL related environment variables."""
    return {
      "MYSQL_HOST": self.MYSQL_HOST,
      "MYSQL_USER": self.MYSQL_USER,
      "MYSQL_PASSWORD": self.MYSQL_PASSWORD.get_secret_value(),
      "MYSQL_PORT": self.MYSQL_PORT,
      "MYSQL_DB": self.MYSQL_DB,
    }

# Instantiate the settings
env_settings = EnvSettings()
