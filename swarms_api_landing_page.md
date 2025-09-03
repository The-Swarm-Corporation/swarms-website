# Swarms API: Multi-Agent Orchestration Platform

## Overview

Swarms API provides a RESTful interface for creating and managing multi-agent systems. Built on a Rust runtime, it handles agent lifecycle management, inter-agent communication, and task distribution across distributed agent networks.

## Architecture

### Runtime Components
- **Agent Runtime**: Rust-based execution engine with sub-millisecond initialization
- **Swarm Router**: Task distribution and agent coordination system
- **Memory Manager**: Efficient data passing between agents with zero-copy operations
- **Concurrency Controller**: Manages thousands of simultaneous agent operations

### System Design
- **Stateless API**: RESTful endpoints for agent and swarm operations
- **Asynchronous Processing**: Non-blocking agent execution with configurable timeouts
- **Resource Pooling**: Shared agent instances for cost optimization
- **Fault Tolerance**: Automatic retry mechanisms and error handling

## Core Functionality

### 1. Agent Management

#### Agent Configuration Schema
```python
from api.schemas import AgentSpec

agent_config = AgentSpec(
    agent_name="data_analyzer",
    description="Processes and analyzes structured data",
    system_prompt="You are a data analysis agent...",
    model_name="gpt-4o-mini",
    role="worker",
    max_loops=1,
    max_tokens=8192,
    temperature=0.5,
    auto_generate_prompt=False,
    tools_list_dictionary=[...],
    streaming_on=True,
    dynamic_temperature_enabled=True
)
```

#### Supported Models
- OpenAI: gpt-4o, gpt-4o-mini, gpt-4.1
- Anthropic: claude-3-5-sonnet, claude-3-7-sonnet
- Custom: Hugging Face models, enterprise deployments
- Excluded: Ollama models (not supported)

### 2. Swarm Orchestration

#### Swarm Configuration
```python
from api.schemas import SwarmSpec

swarm_config = SwarmSpec(
    name="data_processing_pipeline",
    description="Multi-stage data analysis workflow",
    agents=[agent1, agent2, agent3],
    max_loops=3,
    swarm_type="SequentialWorkflow",
    task="Process customer data and generate insights",
    rules="Validate data integrity, maintain privacy",
    service_tier="standard"  # or "flex" for cost optimization
)
```

#### Workflow Types
- **SequentialWorkflow**: Linear task execution
- **ParallelExecution**: Concurrent agent processing
- **HierarchicalControl**: Director-agent coordination
- **DynamicRouting**: Adaptive task distribution

### 3. Advanced Research System

#### Research Configuration
```python
from api.ar import AdvancedResearchInputSchema

research_config = AdvancedResearchInputSchema(
    config={
        "name": "market_analysis",
        "worker_model_name": "claude-3-7-sonnet-20250219",
        "director_model_name": "claude-3-7-sonnet-20250219",
        "max_loops": 2,
        "exa_search_num_results": 5,
        "exa_search_max_characters": 200
    },
    task="Analyze AI adoption trends in financial services"
)
```

#### Research Features
- Multi-source data aggregation via Exa search integration
- Iterative research loops with configurable depth
- Director-agent coordination for research strategy
- Automated source validation and filtering

### 4. Auto-Swarm Generation

#### Builder Configuration
```python
from api.auto_agent_builder import AutoSwarmBuilderSchema

builder_config = AutoSwarmBuilderSchema(
    name="customer_analysis_swarm",
    description="Automatically generated data analysis swarm",
    max_loops=1,
    generate_router_config=True,
    model_name="gpt-4.1",
    task="Create agents for customer behavior analysis"
)
```

#### Generation Capabilities
- Dynamic agent creation based on task requirements
- Automatic role assignment and specialization
- Workflow optimization for task efficiency
- Configurable swarm architectures

### 5. Reasoning Agents

#### Reasoning Configuration
```python
from api.schemas import ReasoningAgentSpec

reasoning_agent = ReasoningAgentSpec(
    agent_name="problem_solver",
    model_name="claude-3-5-sonnet-20240620",
    swarm_type="reasoning_duo",  # or "self_consistency", "IRE"
    num_samples=3,
    output_type="dict-all-except-first",
    task="Solve mathematical optimization problem"
)
```

#### Reasoning Types
- **reasoning_duo**: Two-agent collaborative problem-solving
- **self_consistency**: Multi-sample answer validation
- **IRE**: Iterative reasoning with external knowledge

### 6. Tool Integration

#### Function Definition
```python
tools_config = {
    "type": "function",
    "function": {
        "name": "search_topic",
        "description": "Conduct topic research",
        "parameters": {
            "type": "object",
            "properties": {
                "depth": {
                    "type": "integer",
                    "description": "Research depth (1-3)",
                    "minimum": 1,
                    "maximum": 3
                },
                "detailed_queries": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Generated search queries"
                }
            },
            "required": ["depth", "detailed_queries"]
        }
    }
}
```

#### Available Tools
- Web search via Exa integration
- Code execution in sandboxed environment
- Dynamic API endpoint generation
- Data processing and manipulation

### 7. Streaming

#### Streaming Configuration
```python
streaming_config = {
    "agent_config": {
        "streaming_on": True,
        "max_tokens": 1000,
        "temperature": 0.8
    },
    "task": "Generate content with real-time output",
    "stream": True
}
```

#### Streaming Implementation
- Server-sent events (SSE) format
- Real-time content generation
- Configurable chunk sizes
- Performance metrics and timing data

## API Reference

### Endpoints

#### Agent Operations
```bash
POST /v1/agent/completions
Content-Type: application/json
x-api-key: YOUR_API_KEY

{
    "agent_config": {...},
    "task": "Task description",
    "history": [...],
    "stream": false
}
```

#### Swarm Operations
```bash
POST /v1/swarm/completions
Content-Type: application/json
x-api-key: YOUR_API_KEY

{
    "name": "Swarm Name",
    "agents": [...],
    "task": "Swarm task",
    "swarm_type": "SequentialWorkflow"
}
```

#### Research Operations
```bash
POST /v1/advanced-research/completions
Content-Type: application/json
x-api-key: YOUR_API_KEY

{
    "config": {...},
    "task": "Research task"
}
```

#### Auto-Generation
```bash
POST /v1/auto-swarm-builder/completions
Content-Type: application/json
x-api-key: YOUR_API_KEY

{
    "name": "Swarm Name",
    "task": "Swarm generation task"
}
```

### Utility Endpoints
- `GET /health` - Service health check
- `GET /v1/models/available` - Available model list
- `GET /v1/rate-limits` - Current rate limit status
- `GET /v1/swarm/logs` - Swarm execution logs

## Performance Specifications

### Rate Limits
- **Free Tier**: 100 req/min, 50 req/hour, 50 req/day
- **Premium Tier**: 2,000 req/min, 10,000 req/hour, 100,000 req/day
- **Enterprise**: Custom limits with dedicated infrastructure

### Token Allocation
- **Free Tier**: 200K tokens per agent
- **Premium Tier**: 2M tokens per agent
- **Dynamic Allocation**: Based on task complexity

### Batch Processing
- **Free Tier**: 50 agents per batch
- **Premium Tier**: 500 agents per batch
- **Processing**: Asynchronous with progress tracking

## Implementation Examples

### Python Integration
```python
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("SWARMS_API_KEY")
BASE_URL = "https://api.swarms.world"

headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
}

def create_swarm(swarm_config):
    response = requests.post(
        f"{BASE_URL}/v1/swarm/completions",
        headers=headers,
        json=swarm_config
    )
    return response.json()

# Usage
swarm_result = create_swarm({
    "name": "Data Analysis Swarm",
    "agents": [...],
    "task": "Analyze customer data"
})
```

### JavaScript Integration
```javascript
const axios = require('axios');

const API_KEY = process.env.SWARMS_API_KEY;
const BASE_URL = 'https://api.swarms.world';

const headers = {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json'
};

async function createAgent(agentConfig) {
    try {
        const response = await axios.post(
            `${BASE_URL}/v1/agent/completions`,
            agentConfig,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating agent:', error);
        throw error;
    }
}
```

### cURL Examples
```bash
# Create agent
curl -X POST "https://api.swarms.world/v1/agent/completions" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_config": {
      "agent_name": "Data Analyst",
      "model_name": "gpt-4o-mini",
      "task": "Analyze sales data"
    }
  }'

# Create swarm
curl -X POST "https://api.swarms.world/v1/swarm/completions" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sales Analysis Swarm",
    "agents": [...],
    "task": "Comprehensive sales analysis"
  }'
```

## Use Case Implementations

### Financial Analysis
```python
financial_swarm = {
    "name": "Market Analysis Swarm",
    "agents": [
        {
            "agent_name": "Market Data Collector",
            "model_name": "gpt-4o",
            "role": "worker",
            "system_prompt": "Collect and validate market data"
        },
        {
            "agent_name": "Technical Analyst",
            "model_name": "claude-3-7-sonnet",
            "role": "worker",
            "system_prompt": "Perform technical analysis"
        },
        {
            "agent_name": "Risk Assessor",
            "model_name": "gpt-4.1",
            "role": "worker",
            "system_prompt": "Evaluate risk factors"
        }
    ],
    "task": "Analyze market volatility and assess risk",
    "swarm_type": "SequentialWorkflow"
}
```

### Medical Diagnosis
```python
medical_swarm = {
    "name": "ICD-10 Diagnosis Swarm",
    "agents": [
        {
            "agent_name": "Lab Data Analyzer",
            "model_name": "claude-3-5-sonnet",
            "role": "worker",
            "system_prompt": "Analyze lab report data"
        },
        {
            "agent_name": "ICD-10 Specialist",
            "model_name": "claude-3-7-sonnet",
            "role": "worker",
            "system_prompt": "Map results to ICD-10 codes"
        },
        {
            "agent_name": "Clinical Decision Support",
            "model_name": "gpt-4o",
            "role": "worker",
            "system_prompt": "Provide clinical recommendations"
        }
    ],
    "task": "Analyze lab results and provide ICD-10 diagnoses",
    "swarm_type": "SequentialWorkflow"
}
```

### Research Automation
```python
research_swarm = {
    "name": "AI Trend Research",
    "config": {
        "worker_model_name": "claude-3-7-sonnet",
        "director_model_name": "gpt-4.1",
        "max_loops": 3,
        "exa_search_num_results": 5
    },
    "task": "Research emerging AI trends in 2024"
}
```

## Advanced Configuration

### MCP Integration
```python
mcp_config = {
    "mcp_url": "https://your-mcp-server.com",
    "mcp_config": {
        "connection_type": "websocket",
        "authentication": "api_key",
        "capabilities": ["file_system", "database_access"]
    }
}
```

### Dynamic Parameters
```python
agent_config = {
    "dynamic_temperature_enabled": True,
    "temperature": 0.5,  # Base value
    "max_loops": 1,
    "tool_call_summary": True
}
```

### Memory Configuration
```python
reasoning_config = {
    "memory_capacity": 10000,
    "num_knowledge_items": 5,
    "output_type": "dict-all-except-first"
}
```

### Service Tiers
```python
swarm_config = {
    "service_tier": "flex",  # Lower cost, slower processing
    # Alternative: "standard" for optimal performance
}
```

## Monitoring and Debugging

### Log Retrieval
```python
# Get swarm execution logs
logs_response = requests.get(
    f"{BASE_URL}/v1/swarm/logs",
    headers=headers
)

# Parse log data
for log_entry in logs_response.json():
    print(f"Agent: {log_entry['agent_name']}")
    print(f"Execution Time: {log_entry['execution_time']}")
    print(f"Token Usage: {log_entry['token_usage']}")
```

### Performance Metrics
- Agent response time tracking
- Token usage monitoring
- Swarm efficiency analysis
- Error rate tracking

## Security

### Authentication
- API key-based authentication
- Rate limiting per key
- Audit logging for all requests

### Data Handling
- End-to-end encryption
- GDPR compliance
- SOC 2 Type II certification
- Zero-knowledge architecture options

## Setup

### 1. API Key
Get your API key from [Swarms API Keys](https://swarms.world/platform/api-keys)

### 2. Dependencies
```bash
pip install requests python-dotenv
npm install axios dotenv
```

### 3. Environment
```bash
# .env file
SWARMS_API_KEY=your_api_key_here
SWARMS_BASE_URL=https://api.swarms.world
```

### 4. First Request
```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

response = requests.post(
    "https://api.swarms.world/v1/agent/completions",
    headers={"x-api-key": os.getenv("SWARMS_API_KEY")},
    json={
        "agent_config": {
            "agent_name": "Helper",
            "model_name": "gpt-4o-mini"
        },
        "task": "Hello, how can you help me?"
    }
)

print(response.json())
```

## Documentation

### Resources
- [API Reference](https://docs.swarms.ai)
- [GitHub Examples](https://github.com/swarms-ai)
- [Discord Community](https://discord.gg/swarms)

### Support
- Developer community on Discord
- GitHub issues and discussions
- Enterprise support for business customers

## Technical Specifications

### Runtime Performance
- Agent initialization: <1ms
- Concurrent agents: 10,000+
- Memory efficiency: Zero-copy data passing
- Fault tolerance: Automatic retry with exponential backoff

### API Characteristics
- RESTful design with JSON payloads
- HTTP/2 support for improved performance
- Compression middleware for large responses
- CORS enabled for web applications

### Scalability
- Horizontal scaling across multiple instances
- Load balancing with intelligent routing
- Resource pooling for cost optimization
- Asynchronous processing for long-running tasks

---

*Swarms API: Multi-Agent Orchestration Platform*
