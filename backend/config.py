"""
Configuration file for the Flask application
Customize settings for different environments
"""

import os


class Config:
    """Base configuration"""
    # Flask
    DEBUG = False
    TESTING = False
    
    # Model
    MODEL_PATH = os.getenv('MODEL_PATH', 'turmeric_model.h5')
    IMAGE_SIZE = 224
    
    # File Upload
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
    
    # Class labels
    CLASS_LABELS = {
        0: 'boiled_bulb',
        1: 'boiled_finger',
        2: 'raw_bulb',
        3: 'raw_finger'
    }


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    FLASK_ENV = 'development'


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    FLASK_ENV = 'production'


class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True


# Select config based on environment
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}


def get_config(env=None):
    """Get configuration based on environment"""
    if env is None:
        env = os.getenv('FLASK_ENV', 'development')
    return config.get(env, config['default'])
